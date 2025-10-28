import type { DeliveryMethod, HeroSlide, Highlight, Testimonial } from "../types";

export type Locale = "en" | "pt-BR" | "es";

export interface AppMessages {
  navigation: {
    menu: ReadonlyArray<{ href: string; label: string }>;
    actions: {
      cartCta: string;
      openCart: string;
      cartWithCount: (count: number) => string;
      language: string;
      admin: string;
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
  checkout: {
    title: string;
    subtitle: string;
    delivery: {
      title: string;
      options: ReadonlyArray<{
        value: DeliveryMethod;
        label: string;
        description: string;
        fee: number;
      }>;
    };
    customer: {
      title: string;
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      notes: string;
      notesPlaceholder: string;
    };
    summary: {
      title: string;
      subtotal: string;
      delivery: string;
      total: string;
      quantityLabel: (quantity: number) => string;
    };
    pix: {
      title: string;
      instructions: string;
      confirmCta: string;
    };
    actions: {
      generatePix: string;
      processing: string;
      confirming: string;
    };
    success: {
      title: string;
      description: string;
      backHome: string;
    };
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
  admin: {
    gate: {
      title: string;
      subtitle: string;
      label: string;
      placeholder: string;
      submit: string;
      error: string;
    };
    intro: {
      eyebrow: string;
      title: string;
      subtitle: string;
      primaryCta: string;
      logout: string;
      loading: string;
      error: string;
    };
    metrics: {
      title: string;
      subtitle: string;
      totalProducts: string;
      totalStock: string;
      totalSold: string;
      inventoryValue: string;
      salesRevenue: string;
      potentialRevenue: string;
      totalOrders: string;
      pendingOrders: string;
      paidOrders: string;
      averageOrderValue: string;
      placeholders: ReadonlyArray<{ label: string; value: string }>;
    };
    inventory: {
      title: string;
      subtitle: string;
      empty: string;
      columns: {
        name: string;
        category: string;
        stock: string;
        sold: string;
        price: string;
        actions: string;
      };
      actions: {
        edit: string;
        delete: string;
      };
    };
    sales: {
      title: string;
      subtitle: string;
      empty: string;
    };
    orders: {
      title: string;
      subtitle: string;
      empty: string;
      columns: {
        id: string;
        customer: string;
        total: string;
        delivery: string;
        status: string;
        createdAt: string;
      };
      statuses: {
        pending: string;
        paid: string;
      };
    };
    form: {
      createTitle: string;
      editTitle: string;
      description: string;
      cancel: string;
      createCta: string;
      saveCta: string;
      fields: {
        name: string;
        category: string;
        price: string;
        cost: string;
        stock: string;
        sold: string;
        description: string;
        image: string;
        tags: string;
        tagsPlaceholder: string;
      };
      validation: {
        name: string;
        category: string;
        price: string;
        stock: string;
        sold: string;
        cost: string;
      };
    };
    notifications: {
      createSuccess: (name: string) => string;
      createError: string;
      updateSuccess: (name: string) => string;
      updateError: string;
      deleteSuccess: (name: string) => string;
      deleteError: string;
      confirmDelete: (name: string) => string;
    };
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
        language: "Language",
        admin: "Open admin console"
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
    checkout: {
      title: "Secure checkout",
      subtitle: "Pix-powered payments in seconds",
      delivery: {
        title: "Delivery method",
        options: [
          {
            value: "correios",
            label: "Correios",
            description: "3-5 business days across Brazil",
            fee: 20
          },
          {
            value: "partner",
            label: "Motorista Parceiro",
            description: "Same-day courier in major cities",
            fee: 35
          },
          {
            value: "pickup",
            label: "Retirada em loja",
            description: "Pick up in-store at no cost",
            fee: 0
          }
        ] satisfies ReadonlyArray<{
          value: DeliveryMethod;
          label: string;
          description: string;
          fee: number;
        }>
      },
      customer: {
        title: "Contact details",
        name: "Full name",
        namePlaceholder: "Maria Silva",
        email: "Email",
        emailPlaceholder: "maria@email.com",
        notes: "Notes",
        notesPlaceholder: "Apartment, concierge, preferred contact time…"
      },
      summary: {
        title: "Order summary",
        subtotal: "Subtotal",
        delivery: "Delivery",
        total: "Total due",
        quantityLabel: (quantity: number) => `${quantity}×`
      },
      pix: {
        title: "Pix confirmation",
        instructions: "Scan or copy the Pix code below to finalize your purchase.",
        confirmCta: "Mark Pix as paid"
      },
      actions: {
        generatePix: "Generate Pix code",
        processing: "Generating Pix…",
        confirming: "Confirming Pix…"
      },
      success: {
        title: "Order confirmed!",
        description: "We've received your Pix and are preparing your shipment.",
        backHome: "Back to the storefront"
      }
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
    },
    admin: {
      gate: {
        title: "Team access",
        subtitle: "Enter the studio access code to continue.",
        label: "Access code",
        placeholder: "••••••",
        submit: "Unlock",
        error: "That code didn't work. Please try again."
      },
      intro: {
        eyebrow: "Operations",
        title: "Merchandising control center",
        subtitle: "Monitor momentum, adjust assortment, and keep every launch in sync.",
        primaryCta: "New product",
        logout: "Sign out",
        loading: "Loading the latest metrics…",
        error: "We couldn't load the dashboard data."
      },
      metrics: {
        title: "Performance snapshot",
        subtitle: "Live indicators covering sell-through, inventory, and revenue outlook.",
        totalProducts: "Active styles",
        totalStock: "Units on hand",
        totalSold: "Units sold",
        inventoryValue: "Inventory value",
        salesRevenue: "Sales to date",
        potentialRevenue: "Potential revenue",
        totalOrders: "Orders",
        pendingOrders: "Pending Pix",
        paidOrders: "Paid orders",
        averageOrderValue: "Average order value",
        placeholders: [
          { label: "Active styles", value: "—" },
          { label: "Units on hand", value: "—" },
          { label: "Units sold", value: "—" },
          { label: "Inventory value", value: "—" },
          { label: "Sales to date", value: "—" },
          { label: "Potential revenue", value: "—" },
          { label: "Orders", value: "—" },
          { label: "Pending Pix", value: "—" },
          { label: "Paid orders", value: "—" },
          { label: "Average order value", value: "—" }
        ]
      },
      inventory: {
        title: "Catalog overview",
        subtitle: "Track availability and fine-tune the mix in real time.",
        empty: "Add your first product to populate the catalog.",
        columns: {
          name: "Name",
          category: "Category",
          stock: "Stock",
          sold: "Sold",
          price: "Price",
          actions: "Actions"
        },
        actions: {
          edit: "Edit",
          delete: "Delete"
        }
      },
      sales: {
        title: "Revenue by category",
        subtitle: "Compare momentum across the assortment.",
        empty: "No category performance data yet."
      },
      orders: {
        title: "Latest orders",
        subtitle: "Monitor Pix confirmations and fulfillment steps.",
        empty: "Orders will appear here after checkout is complete.",
        columns: {
          id: "Order",
          customer: "Customer",
          total: "Total",
          delivery: "Delivery",
          status: "Status",
          createdAt: "Placed"
        },
        statuses: {
          pending: "Awaiting Pix",
          paid: "Paid"
        }
      },
      form: {
        createTitle: "Create product",
        editTitle: "Edit product",
        description: "Keep details concise and accurate so the storefront stays aligned.",
        cancel: "Cancel",
        createCta: "Create",
        saveCta: "Save changes",
        fields: {
          name: "Name",
          category: "Category",
          price: "Price",
          cost: "Cost",
          stock: "Stock",
          sold: "Sold",
          description: "Description",
          image: "Image URL",
          tags: "Tags",
          tagsPlaceholder: "Separate with commas"
        },
        validation: {
          name: "Name is required",
          category: "Category is required",
          price: "Price must be zero or greater",
          stock: "Stock must be zero or greater",
          sold: "Sold must be zero or greater",
          cost: "Cost must be zero or greater"
        }
      },
      notifications: {
        createSuccess: (name: string) => `${name} published successfully`,
        createError: "We couldn't create that product.",
        updateSuccess: (name: string) => `${name} updated`,
        updateError: "We couldn't save those changes.",
        deleteSuccess: (name: string) => `${name} archived`,
        deleteError: "We couldn't delete that product.",
        confirmDelete: (name: string) => `Archive ${name}?`
      }
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
        language: "Idioma",
        admin: "Abrir painel administrativo"
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
    checkout: {
      title: "Finalizar pedido",
      subtitle: "Confirme o envio e gere seu Pix",
      delivery: {
        title: "Entrega",
        options: [
          {
            value: "correios",
            label: "Correios",
            description: "3 a 5 dias úteis para todo o Brasil",
            fee: 20
          },
          {
            value: "partner",
            label: "Motorista Parceiro",
            description: "Entrega no mesmo dia nas capitais",
            fee: 35
          },
          {
            value: "pickup",
            label: "Retirada em loja",
            description: "Retire sem custo na flagship",
            fee: 0
          }
        ] satisfies ReadonlyArray<{
          value: DeliveryMethod;
          label: string;
          description: string;
          fee: number;
        }>
      },
      customer: {
        title: "Dados de contato",
        name: "Nome completo",
        namePlaceholder: "Maria Silva",
        email: "E-mail",
        emailPlaceholder: "maria@email.com",
        notes: "Observações",
        notesPlaceholder: "Apartamento, portaria, melhor horário…"
      },
      summary: {
        title: "Resumo do pedido",
        subtotal: "Subtotal",
        delivery: "Entrega",
        total: "Total",
        quantityLabel: (quantity: number) => `${quantity}×`
      },
      pix: {
        title: "Pagamento via Pix",
        instructions: "Escaneie ou copie o código Pix para finalizar a compra.",
        confirmCta: "Confirmar Pix"
      },
      actions: {
        generatePix: "Gerar código Pix",
        processing: "Gerando Pix…",
        confirming: "Confirmando Pix…"
      },
      success: {
        title: "Pedido confirmado!",
        description: "Recebemos seu Pix e já estamos preparando o envio.",
        backHome: "Voltar para a vitrine"
      }
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
    },
    admin: {
      gate: {
        title: "Acesso da equipe",
        subtitle: "Informe o código de acesso do estúdio para continuar.",
        label: "Código de acesso",
        placeholder: "••••••",
        submit: "Desbloquear",
        error: "Código inválido. Tente novamente."
      },
      intro: {
        eyebrow: "Operações",
        title: "Central de merchandising",
        subtitle: "Acompanhe desempenho, ajuste o mix e mantenha cada lançamento alinhado.",
        primaryCta: "Novo produto",
        logout: "Sair",
        loading: "Carregando indicadores…",
        error: "Não foi possível carregar os dados do painel."
      },
      metrics: {
        title: "Visão de performance",
        subtitle: "Indicadores em tempo real de giro, estoque e projeção de receita.",
        totalProducts: "Estilos ativos",
        totalStock: "Unidades em estoque",
        totalSold: "Unidades vendidas",
        inventoryValue: "Valor de estoque",
        salesRevenue: "Receita realizada",
        potentialRevenue: "Receita potencial",
        totalOrders: "Pedidos",
        pendingOrders: "Pix pendentes",
        paidOrders: "Pedidos pagos",
        averageOrderValue: "Ticket médio",
        placeholders: [
          { label: "Estilos ativos", value: "—" },
          { label: "Unidades em estoque", value: "—" },
          { label: "Unidades vendidas", value: "—" },
          { label: "Valor de estoque", value: "—" },
          { label: "Receita realizada", value: "—" },
          { label: "Receita potencial", value: "—" },
          { label: "Pedidos", value: "—" },
          { label: "Pix pendentes", value: "—" },
          { label: "Pedidos pagos", value: "—" },
          { label: "Ticket médio", value: "—" }
        ]
      },
      inventory: {
        title: "Visão do catálogo",
        subtitle: "Acompanhe disponibilidade e ajuste o mix em tempo real.",
        empty: "Adicione o primeiro produto para preencher o catálogo.",
        columns: {
          name: "Nome",
          category: "Categoria",
          stock: "Estoque",
          sold: "Vendidos",
          price: "Preço",
          actions: "Ações"
        },
        actions: {
          edit: "Editar",
          delete: "Excluir"
        }
      },
      sales: {
        title: "Receita por categoria",
        subtitle: "Compare o ritmo de cada linha.",
        empty: "Ainda não há dados de categoria."
      },
      orders: {
        title: "Pedidos recentes",
        subtitle: "Acompanhe confirmações Pix e envio.",
        empty: "Os pedidos aparecerão aqui após a finalização da compra.",
        columns: {
          id: "Pedido",
          customer: "Cliente",
          total: "Total",
          delivery: "Entrega",
          status: "Status",
          createdAt: "Data"
        },
        statuses: {
          pending: "Aguardando Pix",
          paid: "Pago"
        }
      },
      form: {
        createTitle: "Criar produto",
        editTitle: "Editar produto",
        description: "Mantenha as informações objetivas para alinhar com a vitrine.",
        cancel: "Cancelar",
        createCta: "Criar",
        saveCta: "Salvar alterações",
        fields: {
          name: "Nome",
          category: "Categoria",
          price: "Preço",
          cost: "Custo",
          stock: "Estoque",
          sold: "Vendidos",
          description: "Descrição",
          image: "URL da imagem",
          tags: "Tags",
          tagsPlaceholder: "Separe com vírgulas"
        },
        validation: {
          name: "Informe o nome",
          category: "Informe a categoria",
          price: "O preço deve ser maior ou igual a zero",
          stock: "O estoque deve ser maior ou igual a zero",
          sold: "Vendidos deve ser maior ou igual a zero",
          cost: "O custo deve ser maior ou igual a zero"
        }
      },
      notifications: {
        createSuccess: (name: string) => `${name} publicado com sucesso`,
        createError: "Não foi possível criar o produto.",
        updateSuccess: (name: string) => `${name} atualizado`,
        updateError: "Não foi possível salvar as alterações.",
        deleteSuccess: (name: string) => `${name} removido`,
        deleteError: "Não foi possível excluir o produto.",
        confirmDelete: (name: string) => `Excluir ${name}?`
      }
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
        language: "Idioma",
        admin: "Abrir panel administrativo"
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
    checkout: {
      title: "Finalizar pedido",
      subtitle: "Elige la entrega y genera tu Pix",
      delivery: {
        title: "Entrega",
        options: [
          {
            value: "correios",
            label: "Correios",
            description: "3 a 5 días hábiles en Brasil",
            fee: 20
          },
          {
            value: "partner",
            label: "Conductor aliado",
            description: "Entrega en el mismo día en capitales",
            fee: 35
          },
          {
            value: "pickup",
            label: "Retiro en tienda",
            description: "Retira sin costo en nuestra flagship",
            fee: 0
          }
        ] satisfies ReadonlyArray<{
          value: DeliveryMethod;
          label: string;
          description: string;
          fee: number;
        }>
      },
      customer: {
        title: "Datos de contacto",
        name: "Nombre completo",
        namePlaceholder: "María Silva",
        email: "Correo",
        emailPlaceholder: "maria@email.com",
        notes: "Notas",
        notesPlaceholder: "Departamento, portería, mejor horario…"
      },
      summary: {
        title: "Resumen de la orden",
        subtotal: "Subtotal",
        delivery: "Entrega",
        total: "Total",
        quantityLabel: (quantity: number) => `${quantity}×`
      },
      pix: {
        title: "Confirmación Pix",
        instructions: "Escanea o copia el código Pix para completar la compra.",
        confirmCta: "Marcar Pix como pagado"
      },
      actions: {
        generatePix: "Generar código Pix",
        processing: "Generando Pix…",
        confirming: "Confirmando Pix…"
      },
      success: {
        title: "¡Pedido confirmado!",
        description: "Recibimos tu Pix y ya preparamos el envío.",
        backHome: "Volver a la tienda"
      }
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
    },
    admin: {
      gate: {
        title: "Acceso del equipo",
        subtitle: "Ingresa el código de acceso del estudio para continuar.",
        label: "Código de acceso",
        placeholder: "••••••",
        submit: "Desbloquear",
        error: "Código incorrecto. Inténtalo de nuevo."
      },
      intro: {
        eyebrow: "Operaciones",
        title: "Centro de merchandising",
        subtitle: "Supervisa el impulso, ajusta el surtido y mantén cada lanzamiento alineado.",
        primaryCta: "Nuevo producto",
        logout: "Cerrar sesión",
        loading: "Cargando indicadores…",
        error: "No pudimos cargar los datos del panel."
      },
      metrics: {
        title: "Instantánea de desempeño",
        subtitle: "Indicadores en vivo de rotación, inventario y proyección de ingresos.",
        totalProducts: "Estilos activos",
        totalStock: "Unidades en inventario",
        totalSold: "Unidades vendidas",
        inventoryValue: "Valor de inventario",
        salesRevenue: "Ingresos realizados",
        potentialRevenue: "Ingresos potenciales",
        totalOrders: "Pedidos",
        pendingOrders: "Pix pendientes",
        paidOrders: "Pedidos pagados",
        averageOrderValue: "Ticket promedio",
        placeholders: [
          { label: "Estilos activos", value: "—" },
          { label: "Unidades en inventario", value: "—" },
          { label: "Unidades vendidas", value: "—" },
          { label: "Valor de inventario", value: "—" },
          { label: "Ingresos realizados", value: "—" },
          { label: "Ingresos potenciales", value: "—" },
          { label: "Pedidos", value: "—" },
          { label: "Pix pendientes", value: "—" },
          { label: "Pedidos pagados", value: "—" },
          { label: "Ticket promedio", value: "—" }
        ]
      },
      inventory: {
        title: "Visión del catálogo",
        subtitle: "Controla la disponibilidad y ajusta el mix en tiempo real.",
        empty: "Agrega tu primer producto para completar el catálogo.",
        columns: {
          name: "Nombre",
          category: "Categoría",
          stock: "Inventario",
          sold: "Vendidos",
          price: "Precio",
          actions: "Acciones"
        },
        actions: {
          edit: "Editar",
          delete: "Eliminar"
        }
      },
      sales: {
        title: "Ingresos por categoría",
        subtitle: "Compara el ritmo de cada línea.",
        empty: "Aún no hay datos por categoría."
      },
      orders: {
        title: "Pedidos recientes",
        subtitle: "Supervisa confirmaciones Pix y envíos.",
        empty: "Los pedidos aparecerán aquí después del checkout.",
        columns: {
          id: "Pedido",
          customer: "Cliente",
          total: "Total",
          delivery: "Entrega",
          status: "Estado",
          createdAt: "Fecha"
        },
        statuses: {
          pending: "Pix pendiente",
          paid: "Pagado"
        }
      },
      form: {
        createTitle: "Crear producto",
        editTitle: "Editar producto",
        description: "Mantén la información precisa para alinear la tienda.",
        cancel: "Cancelar",
        createCta: "Crear",
        saveCta: "Guardar cambios",
        fields: {
          name: "Nombre",
          category: "Categoría",
          price: "Precio",
          cost: "Costo",
          stock: "Inventario",
          sold: "Vendidos",
          description: "Descripción",
          image: "URL de la imagen",
          tags: "Etiquetas",
          tagsPlaceholder: "Sepáralas con comas"
        },
        validation: {
          name: "Ingresa un nombre",
          category: "Ingresa una categoría",
          price: "El precio debe ser mayor o igual a cero",
          stock: "El inventario debe ser mayor o igual a cero",
          sold: "Vendidos debe ser mayor o igual a cero",
          cost: "El costo debe ser mayor o igual a cero"
        }
      },
      notifications: {
        createSuccess: (name: string) => `${name} publicado con éxito`,
        createError: "No pudimos crear el producto.",
        updateSuccess: (name: string) => `${name} actualizado`,
        updateError: "No pudimos guardar los cambios.",
        deleteSuccess: (name: string) => `${name} eliminado`,
        deleteError: "No pudimos eliminar el producto.",
        confirmDelete: (name: string) => `¿Eliminar ${name}?`
      }
    }
  }
};
