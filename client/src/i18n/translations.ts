import type { HeroSlide, Highlight, Testimonial } from "../types";

export type Locale = "en" | "pt-BR" | "es";

export interface AppMessages {
  navigation: {
    menu: ReadonlyArray<{ href: string; label: string }>;
    actions: {
      cartCta: string;
      openCart: string;
      cartWithCount: (count: number) => string;
      language: string;
    };
  };
  hero: {
    eyebrow: string;
    primaryCta: string;
    secondaryCta: string;
    slides: HeroSlide[];
    controls: {
      previous: string;
      next: string;
      goToSlide: (index: number) => string;
      groupLabel: string;
    };
  };
  highlights: {
    items: Highlight[];
  };
  products: {
    sectionEyebrow: string;
    sectionTitle: string;
    sectionCta: string;
    searchPlaceholder: string;
    categoryAll: string;
    emptyState: string;
    noMatches: string;
    error: string;
    retry: string;
  };
  productTile: {
    addToCart: string;
  };
  productDetails: {
    title: string;
    category: string;
    tags: string;
    close: string;
    addToCart: string;
  };
  cart: {
    title: string;
    empty: string;
    subtotal: string;
    checkout: string;
    close: string;
    remove: string;
    quantity: string;
    increase: string;
    decrease: string;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    description: string;
    items: Testimonial[];
  };
  footer: {
    stayInLoop: string;
    description: string;
    emailPlaceholder: string;
    joinCta: string;
    rights: string;
    terms: string;
    privacy: string;
    contactEmail: string;
  };
}

const sharedSlides: Pick<HeroSlide, "id" | "image">[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80"
  }
];

const sharedHighlights: Omit<Highlight, "title" | "description">[] = [
  { id: 1, icon: "🌱" },
  { id: 2, icon: "🤝" },
  { id: 3, icon: "♻️" }
];

const sharedTestimonials: Omit<Testimonial, "quote" | "name" | "role">[] = [
  { id: 1 },
  { id: 2 }
];

export const translations: Record<Locale, AppMessages> = {
  en: {
    navigation: {
      menu: [
        { href: "#collections", label: "Collections" },
        { href: "#new-arrivals", label: "New" },
        { href: "#stories", label: "Stories" },
        { href: "#contact", label: "Contact" }
      ],
      actions: {
        cartCta: "Shop the drop",
        openCart: "View cart",
        cartWithCount: (count: number) => `${count} items in cart`,
        language: "Language"
      }
    },
    hero: {
      eyebrow: "New Season · Limited Run",
      primaryCta: "Explore collection",
      secondaryCta: "Watch the story",
      slides: sharedSlides.map((slide) => {
        if (slide.id === 1) {
          return {
            ...slide,
            title: "Meet the Everyday Icons",
            description:
              "Layerable essentials crafted with mindful materials and timeless silhouettes."
          };
        }
        if (slide.id === 2) {
          return {
            ...slide,
            title: "Summer Linen Capsule",
            description: "Airy weaves, coastal tones, and tailoring that moves wherever you do."
          };
        }
        return {
          ...slide,
          title: "After-Hours Glamour",
          description: "From twilight dinners to rooftop soirées — shimmer with subtle drama."
        };
      }),
      controls: {
        previous: "Previous slide",
        next: "Next slide",
        goToSlide: (index: number) => `Show slide ${index}`,
        groupLabel: "Hero slides"
      }
    },
    highlights: {
      items: sharedHighlights.map((highlight) => {
        if (highlight.id === 1) {
          return {
            ...highlight,
            title: "Mindful Materials",
            description:
              "Organic cotton, regenerative fibers, and recycled trims crafted for longevity."
          };
        }
        if (highlight.id === 2) {
          return {
            ...highlight,
            title: "Fairly Made",
            description: "We partner with ateliers that champion safe, equitable working environments."
          };
        }
        return {
          ...highlight,
          title: "Circular Future",
          description: "Complimentary repair services and resale marketplace keep garments in rotation."
        };
      })
    },
    products: {
      sectionEyebrow: "New arrivals",
      sectionTitle: "Tailored for the season ahead",
      sectionCta: "View all products",
      searchPlaceholder: "Search products",
      categoryAll: "All",
      emptyState: "We're curating the next release. Check back soon.",
      noMatches: "No products match your search right now.",
      error: "We couldn't refresh the latest arrivals.",
      retry: "Try again"
    },
    productTile: {
      addToCart: "Add to bag"
    },
    productDetails: {
      title: "Product details",
      category: "Category",
      tags: "Highlights",
      close: "Close",
      addToCart: "Add to cart"
    },
    cart: {
      title: "Your cart",
      empty: "Your cart is currently empty.",
      subtotal: "Subtotal",
      checkout: "Proceed to checkout",
      close: "Close cart",
      remove: "Remove",
      quantity: "Quantity",
      increase: "Increase quantity",
      decrease: "Decrease quantity"
    },
    testimonials: {
      eyebrow: "Loved by the community",
      title: "Modern luxury rooted in responsibility",
      description:
        "Our collections balance elevated design with mindful production, so you can express your personal style and feel good about every piece you wear.",
      items: sharedTestimonials.map((testimonial) =>
        testimonial.id === 1
          ? {
              ...testimonial,
              quote:
                "Shopper YAS pieces are the backbone of my wardrobe — the tailoring is impeccable and endlessly remixable.",
              name: "Alisha R.",
              role: "Creative Director"
            }
          : {
              ...testimonial,
              quote:
                "The quality is unmatched. I love knowing every piece is crafted with care for both people and planet.",
              name: "Jordan M.",
              role: "Stylist"
            }
      )
    },
    footer: {
      stayInLoop: "Stay in the loop",
      description: "Receive styling notes, early access, and exclusive invitations.",
      emailPlaceholder: "you@example.com",
      joinCta: "Join the list",
      rights: "All rights reserved.",
      terms: "Terms",
      privacy: "Privacy",
      contactEmail: "hello@shopperyas.com"
    }
  },
  "pt-BR": {
    navigation: {
      menu: [
        { href: "#collections", label: "Coleções" },
        { href: "#new-arrivals", label: "Novidades" },
        { href: "#stories", label: "Histórias" },
        { href: "#contact", label: "Contato" }
      ],
      actions: {
        cartCta: "Conheça a coleção",
        openCart: "Ver carrinho",
        cartWithCount: (count: number) => `${count} itens no carrinho`,
        language: "Idioma"
      }
    },
    hero: {
      eyebrow: "Nova temporada · Edição limitada",
      primaryCta: "Explorar coleção",
      secondaryCta: "Assistir ao filme",
      slides: sharedSlides.map((slide) => {
        if (slide.id === 1) {
          return {
            ...slide,
            title: "Ícones para todos os dias",
            description:
              "Peças versáteis feitas com matérias-primas conscientes e silhuetas atemporais."
          };
        }
        if (slide.id === 2) {
          return {
            ...slide,
            title: "Capsule de linho",
            description: "Tramas leves, tons costeiros e alfaiataria que acompanha todos os movimentos."
          };
        }
        return {
          ...slide,
          title: "Elegância ao entardecer",
          description: "Dos jantares ao pôr do sol aos rooftops — brilhe com drama na medida certa."
        };
      }),
      controls: {
        previous: "Slide anterior",
        next: "Próximo slide",
        goToSlide: (index: number) => `Mostrar slide ${index}`,
        groupLabel: "Slides em destaque"
      }
    },
    highlights: {
      items: sharedHighlights.map((highlight) => {
        if (highlight.id === 1) {
          return {
            ...highlight,
            title: "Materiais conscientes",
            description:
              "Algodão orgânico, fibras regenerativas e aviamentos reciclados feitos para durar."
          };
        }
        if (highlight.id === 2) {
          return {
            ...highlight,
            title: "Produção justa",
            description: "Parcerias com ateliês que valorizam ambientes de trabalho seguros e éticos."
          };
        }
        return {
          ...highlight,
          title: "Futuro circular",
          description: "Reparo gratuito e programa de revenda mantêm as peças em circulação."
        };
      })
    },
    products: {
      sectionEyebrow: "Novidades",
      sectionTitle: "Prontas para a próxima estação",
      sectionCta: "Ver todos os produtos",
      searchPlaceholder: "Buscar produtos",
      categoryAll: "Todas",
      emptyState: "Estamos preparando o próximo lançamento. Volte em breve.",
      noMatches: "Nenhum produto corresponde à sua busca no momento.",
      error: "Não foi possível atualizar as novidades.",
      retry: "Tentar novamente"
    },
    productTile: {
      addToCart: "Adicionar à sacola"
    },
    productDetails: {
      title: "Detalhes do produto",
      category: "Categoria",
      tags: "Destaques",
      close: "Fechar",
      addToCart: "Adicionar ao carrinho"
    },
    cart: {
      title: "Seu carrinho",
      empty: "Seu carrinho está vazio no momento.",
      subtotal: "Subtotal",
      checkout: "Finalizar compra",
      close: "Fechar carrinho",
      remove: "Remover",
      quantity: "Quantidade",
      increase: "Aumentar quantidade",
      decrease: "Diminuir quantidade"
    },
    testimonials: {
      eyebrow: "Queridinho da comunidade",
      title: "Luxo moderno com responsabilidade",
      description:
        "Nossas coleções equilibram design sofisticado com produção consciente, para você expressar seu estilo e se sentir bem com cada peça.",
      items: sharedTestimonials.map((testimonial) =>
        testimonial.id === 1
          ? {
              ...testimonial,
              quote:
                "As peças Shopper YAS são a base do meu guarda-roupa — a alfaiataria é impecável e extremamente versátil.",
              name: "Alisha R.",
              role: "Diretora Criativa"
            }
          : {
              ...testimonial,
              quote:
                "A qualidade é incomparável. Adoro saber que cada peça é feita com cuidado com as pessoas e o planeta.",
              name: "Jordan M.",
              role: "Stylist"
            }
      )
    },
    footer: {
      stayInLoop: "Fique por dentro",
      description: "Receba dicas de estilo, acesso antecipado e convites exclusivos.",
      emailPlaceholder: "voce@exemplo.com",
      joinCta: "Quero receber",
      rights: "Todos os direitos reservados.",
      terms: "Termos",
      privacy: "Privacidade",
      contactEmail: "ola@shopperyas.com"
    }
  },
  es: {
    navigation: {
      menu: [
        { href: "#collections", label: "Colecciones" },
        { href: "#new-arrivals", label: "Novedades" },
        { href: "#stories", label: "Historias" },
        { href: "#contact", label: "Contacto" }
      ],
      actions: {
        cartCta: "Descubre la colección",
        openCart: "Ver carrito",
        cartWithCount: (count: number) => `${count} artículos en el carrito`,
        language: "Idioma"
      }
    },
    hero: {
      eyebrow: "Nueva temporada · Edición limitada",
      primaryCta: "Explorar colección",
      secondaryCta: "Ver la historia",
      slides: sharedSlides.map((slide) => {
        if (slide.id === 1) {
          return {
            ...slide,
            title: "Iconos para cada día",
            description:
              "Básicos combinables elaborados con materiales conscientes y siluetas atemporales."
          };
        }
        if (slide.id === 2) {
          return {
            ...slide,
            title: "Cápsula de lino",
            description: "Tejidos ligeros, tonos costeros y sastrería que se mueve contigo."
          };
        }
        return {
          ...slide,
          title: "Brillo nocturno",
          description: "De cenas al atardecer a terrazas — deslumbra con un drama sutil."
        };
      }),
      controls: {
        previous: "Diapositiva anterior",
        next: "Siguiente diapositiva",
        goToSlide: (index: number) => `Mostrar diapositiva ${index}`,
        groupLabel: "Diapositivas destacadas"
      }
    },
    highlights: {
      items: sharedHighlights.map((highlight) => {
        if (highlight.id === 1) {
          return {
            ...highlight,
            title: "Materiales conscientes",
            description:
              "Algodón orgánico, fibras regenerativas y detalles reciclados pensados para durar."
          };
        }
        if (highlight.id === 2) {
          return {
            ...highlight,
            title: "Hecho con justicia",
            description: "Trabajamos con ateliers que garantizan espacios seguros y equitativos."
          };
        }
        return {
          ...highlight,
          title: "Futuro circular",
          description: "Reparación gratuita y reventa mantienen las prendas en rotación."
        };
      })
    },
    products: {
      sectionEyebrow: "Novedades",
      sectionTitle: "Listas para la próxima temporada",
      sectionCta: "Ver todos los productos",
      searchPlaceholder: "Buscar productos",
      categoryAll: "Todas",
      emptyState: "Estamos preparando el próximo lanzamiento. Vuelve pronto.",
      noMatches: "No hay productos que coincidan con tu búsqueda ahora mismo.",
      error: "No pudimos actualizar las novedades.",
      retry: "Reintentar"
    },
    productTile: {
      addToCart: "Agregar a la bolsa"
    },
    productDetails: {
      title: "Detalles del producto",
      category: "Categoría",
      tags: "Destacados",
      close: "Cerrar",
      addToCart: "Agregar al carrito"
    },
    cart: {
      title: "Tu carrito",
      empty: "Tu carrito está vacío por ahora.",
      subtotal: "Subtotal",
      checkout: "Ir a pagar",
      close: "Cerrar carrito",
      remove: "Eliminar",
      quantity: "Cantidad",
      increase: "Aumentar cantidad",
      decrease: "Disminuir cantidad"
    },
    testimonials: {
      eyebrow: "Amado por la comunidad",
      title: "Lujo moderno con responsabilidad",
      description:
        "Nuestras colecciones equilibran diseño sofisticado con producción consciente, para que expreses tu estilo y te sientas bien con cada prenda.",
      items: sharedTestimonials.map((testimonial) =>
        testimonial.id === 1
          ? {
              ...testimonial,
              quote:
                "Las piezas de Shopper YAS son la base de mi armario — la sastrería es impecable y muy versátil.",
              name: "Alisha R.",
              role: "Directora Creativa"
            }
          : {
              ...testimonial,
              quote:
                "La calidad es insuperable. Me encanta saber que cada prenda se crea cuidando a las personas y al planeta.",
              name: "Jordan M.",
              role: "Stylist"
            }
      )
    },
    footer: {
      stayInLoop: "Mantente al día",
      description: "Recibe notas de estilo, acceso anticipado e invitaciones exclusivas.",
      emailPlaceholder: "tú@ejemplo.com",
      joinCta: "Quiero unirme",
      rights: "Todos los derechos reservados.",
      terms: "Términos",
      privacy: "Privacidad",
      contactEmail: "hola@shopperyas.com"
    }
  }
};
