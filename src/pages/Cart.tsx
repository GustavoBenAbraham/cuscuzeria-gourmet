import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowUpRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "../hooks/useCart";
import { products } from "../data/catalog";
import { restaurant } from "../data/restaurant";
import { money, whatsappUrl } from "../utils/order";
const schema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Informe seu nome (pelo menos 2 caracteres).")
      .max(80, "Use até 80 caracteres."),
    note: z.string().max(500, "Use até 500 caracteres."),
    mode: z.enum(["", "retirada", "entrega"]),
    address: z.string().max(300, "Use até 300 caracteres."),
  })
  .superRefine((d, ctx) => {
    if (d.mode && !restaurant.confirmedOrderModes.includes(d.mode))
      ctx.addIssue({
        code: "custom",
        path: ["mode"],
        message: "Modalidade ainda não confirmada.",
      });
    if (d.mode === "entrega" && d.address.trim().length < 8)
      ctx.addIssue({
        code: "custom",
        path: ["address"],
        message: "Informe o endereço completo.",
      });
  });
type Fields = z.infer<typeof schema>;
export function Cart() {
  const cart = useCart();
  const [url, setUrl] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", note: "", mode: "", address: "" },
  });
  function submit(data: Fields) {
    setUrl(
      whatsappUrl({
        name: data.name,
        note: data.note,
        mode: data.mode || undefined,
        address: data.address,
        items: cart.items.map((i) => {
          const p = products.find((p) => p.id === i.productId)!;
          return {
            name: p.name,
            quantity: i.quantity,
            price: p.price!,
            note: i.note,
          };
        }),
      }),
    );
  }
  return (
    <section className="wrap section">
      <div className="eyebrow">MAIS PERTO DO SEU PRÓXIMO SABOR</div>
      <h1>
        Seu <em>pedido.</em>
      </h1>
      {!cart.items.length ? (
        <div className="empty">
          <ShoppingBag size={45} />
          <h2>Sua mesa ainda está vazia.</h2>
          <p>Explore o cardápio e adicione seus favoritos.</p>
          <Link to="/cardapio" className="button">
            Explorar cardápio <ArrowUpRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="checkout-grid">
          <div>
            {cart.storageError && (
              <p role="alert" className="notice">
                Seu navegador não permitiu salvar o carrinho. Os itens
                permanecem nesta sessão.
              </p>
            )}
            <div className="cart-items">
              {cart.items.map((i) => {
                const p = products.find((p) => p.id === i.productId)!;
                return (
                  <article className="cart-row" key={i.productId}>
                    <div className="cart-row-title">
                      <div>
                        <h2>{p.name}</h2>
                        <span>{money(p.price!)} por unidade</span>
                      </div>
                      <button
                        aria-label={`Remover ${p.name}`}
                        onClick={() => {
                          cart.quantity(p.id, 0);
                          setUrl("");
                        }}
                      >
                        <Trash2 size={19} />
                      </button>
                    </div>
                    <div className="cart-row-bottom">
                      <div className="stepper">
                        <button
                          aria-label={`Diminuir ${p.name}`}
                          onClick={() => {
                            cart.quantity(p.id, i.quantity - 1);
                            setUrl("");
                          }}
                        >
                          <Minus size={16} />
                        </button>
                        <span>{i.quantity}</span>
                        <button
                          disabled={i.quantity >= 99}
                          aria-label={`Aumentar ${p.name}`}
                          onClick={() => {
                            cart.quantity(p.id, i.quantity + 1);
                            setUrl("");
                          }}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <strong>{money(i.quantity * p.price!)}</strong>
                    </div>
                    <label className="item-note">
                      Observações deste item
                      <input
                        maxLength={300}
                        value={i.note}
                        placeholder="Ex.: sem cebola; escolha de recheio"
                        onChange={(e) => {
                          cart.note(p.id, e.target.value);
                          setUrl("");
                        }}
                      />
                    </label>
                  </article>
                );
              })}
            </div>
            <Link className="text-link" to="/cardapio">
              Continuar escolhendo <ArrowUpRight size={17} />
            </Link>
          </div>
          <form
            className="order-form"
            onSubmit={handleSubmit(submit)}
            onChange={() => setUrl("")}
          >
            <h2>Vamos combinar?</h2>
            <div className="subtotal">
              <span>Subtotal · {cart.count} itens</span>
              <strong>{money(cart.total)}</strong>
            </div>
            <p className="form-hint">
              Frete e valor final serão confirmados pelo restaurante.
            </p>
            <label>
              Seu nome
              <input
                autoComplete="given-name"
                {...register("name")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
            </label>
            {errors.name && (
              <p id="name-error" role="alert" className="field-error">
                {errors.name.message}
              </p>
            )}
            {restaurant.confirmedOrderModes.length > 0 ? (
              <>
                <label>
                  Tipo de pedido
                  <select {...register("mode")}>
                    <option value="">A combinar</option>
                    {restaurant.confirmedOrderModes.map((mode) => (
                      <option key={mode} value={mode}>
                        {mode === "entrega" ? "Entrega" : "Retirada"}
                      </option>
                    ))}
                  </select>
                </label>
                {watch("mode") === "entrega" && (
                  <label>
                    Endereço
                    <input
                      autoComplete="street-address"
                      {...register("address")}
                    />
                  </label>
                )}
              </>
            ) : (
              <p className="notice">
                Entrega ou retirada: a combinar no WhatsApp.
              </p>
            )}
            {errors.mode && (
              <p className="field-error" role="alert">
                {errors.mode.message}
              </p>
            )}
            {errors.address && (
              <p className="field-error" role="alert">
                {errors.address.message}
              </p>
            )}
            <label>
              Observações gerais
              <textarea
                rows={3}
                maxLength={500}
                {...register("note")}
                placeholder="Conte como prefere seu pedido"
              />
            </label>
            {errors.note && (
              <p role="alert" className="field-error">
                {errors.note.message}
              </p>
            )}
            <button type="submit" className="button">
              Preparar pedido para WhatsApp <ArrowUpRight size={18} />
            </button>
            {url && (
              <div className="ready" role="status">
                <p>
                  Seu pedido está preparado. Abra o WhatsApp e confirme o envio
                  da mensagem.
                </p>
                <a
                  className="button"
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir WhatsApp <ArrowUpRight size={18} />
                </a>
              </div>
            )}
            <p className="form-hint">
              Nenhum pedido é enviado automaticamente. Disponibilidade, valor
              final e prazo devem ser confirmados na conversa. Seu nome não será
              salvo neste site.
            </p>
          </form>
        </div>
      )}
    </section>
  );
}
