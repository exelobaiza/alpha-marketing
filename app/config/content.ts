interface ContentType {
  hero: {
    title: string;
    description: string;
    cta: {
      primary: string;
      secondary: string;
    };
  };
  pricing: {
    title: string;
    description: string;
    plans: {
      basic: {
        description: string;
        features: string[];
      };
      intermediate: {
        description: string;
        features: string[];
      };
      professional: {
        description: string;
        features: string[];
      };
      premium: {
        description: string;
        features: string[];
      };
    };
    cta: string;
  };
  influencers: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    description: string;
    customPlan: string;
  };
}

const latamContent: ContentType = {
  hero: {
    title: "Potencia tu presencia en redes sociales",
    description: "Impulsamos la identidad de tu marca con estrategias digitales innovadoras y contenido de alto impacto y valor para llevar a tu marca al siguiente nivel",
    cta: {
      primary: "VER PLANES",
      secondary: "SEGUINOS EN INSTAGRAM"
    }
  },
  pricing: {
    title: "Impulsa tu marca con nuestros planes",
    description: "Creamos experiencias y estrategias digitales que transforman a tus seguidores en una comunidad fidelizada para tu marca, tus productos y tus ventas. Elegí el plan que se adapte mejor a tus objetivos",
    plans: {
      basic: {
        description: "Para negocios que inician",
        features: [
          "Gestión de 1 plataforma",
          "4 historias mensuales",
          "2 posts mensuales",
          "2 reels mensuales",
          "Informe mensual"
        ]
      },
      intermediate: {
        description: "Para negocios en crecimiento",
        features: [
          "Gestión de 1 plataforma",
          "4 historias mensuales",
          "3 posts mensuales",
          "3 reels mensuales",
          "Publicidad Digital adaptada",
          "Informe mensual"
        ]
      },
      professional: {
        description: "Para empresas establecidas",
        features: [
          "Gestión de 1 plataforma",
          "4 historias mensuales",
          "4 posts mensuales",
          "4 reels mensuales",
          "Publicidad Digital adaptada",
          "Informe mensual"
        ]
      },
      premium: {
        description: "Gestión integral",
        features: [
          "Gestión de 1 plataforma",
          "4 historias mensuales",
          "4 posts mensuales",
          "4 reels mensuales",
          "Publicidad Digital adaptada",
          "Informe mensual"
        ]
      }
    },
    cta: "Comenzar ahora"
  },
  influencers: {
    title: "Conectamos marcas con talentos ideales para potenciar su alcance y generar un impacto real",
    description: "Creamos estrategias de colaboración auténticas que fortalecen la identidad de tu marca y te acercan a tu público objetivo. ¡Hacé crecer tu marca con el poder del influencer marketing!"
  },
  contact: {
    title: "¿Tenés alguna pregunta?",
    description: "¡Escribinos y trabajemos juntos para potenciar tu marca y llevarla al siguiente nivel!",
    customPlan: "¿Necesitás algo más personalizado?"
  }
};

const europeContent: ContentType = {
  hero: {
    title: "Potencia tu presencia en redes sociales",
    description: "Impulsamos la identidad de tu marca con estrategias digitales innovadoras y contenido de alto impacto y valor para llevar tu marca al siguiente nivel",
    cta: {
      primary: "VER PLANES",
      secondary: "SÍGUENOS EN INSTAGRAM"
    }
  },
  pricing: {
    title: "Impulsa tu marca con nuestros planes",
    description: "Creamos experiencias y estrategias digitales que transforman a tus seguidores en una comunidad fidelizada para tu marca, tus productos y tus ventas. Elige el plan que mejor se adapte a tus objetivos",
    plans: {
      basic: {
        description: "Para negocios que empiezan",
        features: [
          "Gestión de 1 plataforma",
          "4 historias mensuales",
          "2 publicaciones mensuales",
          "2 reels mensuales",
          "Informe mensual"
        ]
      },
      intermediate: {
        description: "Para negocios en crecimiento",
        features: [
          "Gestión de 1 plataforma",
          "4 historias mensuales",
          "3 publicaciones mensuales",
          "3 reels mensuales",
          "Publicidad Digital adaptada",
          "Informe mensual"
        ]
      },
      professional: {
        description: "Para empresas consolidadas",
        features: [
          "Gestión de 1 plataforma",
          "4 historias mensuales",
          "4 publicaciones mensuales",
          "4 reels mensuales",
          "Publicidad Digital adaptada",
          "Informe mensual"
        ]
      },
      premium: {
        description: "Gestión integral",
        features: [
          "Gestión de 1 plataforma",
          "4 historias mensuales",
          "4 publicaciones mensuales",
          "4 reels mensuales",
          "Publicidad Digital adaptada",
          "Informe mensual"
        ]
      }
    },
    cta: "Empezar ahora"
  },
  influencers: {
    title: "Conectamos marcas con talentos ideales para potenciar su alcance y generar un impacto real",
    description: "Creamos estrategias de colaboración auténticas que fortalecen la identidad de tu marca y te acercan a tu público objetivo. ¡Haz crecer tu marca con el poder del influencer marketing!"
  },
  contact: {
    title: "¿Tienes alguna pregunta?",
    description: "¡Escríbenos y trabajemos juntos para potenciar tu marca y llevarla al siguiente nivel!",
    customPlan: "¿Necesitas algo más personalizado?"
  }
};

export const content = {
  LATAM: latamContent,
  EUROPE: europeContent
}; 