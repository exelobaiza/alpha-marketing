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
    title: "Haz que tu marca mole en redes sociales",
    description: "Le damos caña a tu marca con estrategias digitales que son la leche y contenido de primera para que pegues el pelotazo",
    cta: {
      primary: "ÉCHALE UN VISTAZO",
      secondary: "MIRA NUESTRO INSTA"
    }
  },
  pricing: {
    title: "Planes que son un chollo",
    description: "Montamos unas estrategias digitales que flipas para que tus seguidores se queden pillados con tu marca. Elige el plan que más te mole",
    plans: {
      basic: {
        description: "Para negocios que están empezando a currar",
        features: [
          "Llevamos una red social",
          "4 stories al mes que son la caña",
          "2 posts guapos al mes",
          "2 reels que flipas al mes",
          "Informe mensual con todos los detalles"
        ]
      },
      intermediate: {
        description: "Para negocios que van viento en popa",
        features: [
          "Llevamos una red social",
          "4 stories al mes que son la caña",
          "3 posts guapos al mes",
          "3 reels que flipas al mes",
          "Publicidad Digital de primera",
          "Informe mensual con todos los detalles"
        ]
      },
      professional: {
        description: "Para empresas que ya son la leche",
        features: [
          "Llevamos una red social",
          "4 stories al mes que son la caña",
          "4 posts guapos al mes",
          "4 reels que flipas al mes",
          "Publicidad Digital de primera",
          "Informe mensual con todos los detalles"
        ]
      },
      premium: {
        description: "El pack más guapo",
        features: [
          "Llevamos una red social",
          "4 stories al mes que son la caña",
          "4 posts guapos al mes",
          "4 reels que flipas al mes",
          "Publicidad Digital de primera",
          "Informe mensual con todos los detalles"
        ]
      }
    },
    cta: "¡Vamos a por ello!"
  },
  influencers: {
    title: "Conectamos marcas con influencers que son un crack para dar el pelotazo juntos",
    description: "Montamos colaboraciones que molan mazo y que pegan con tu marca como anillo al dedo. ¡Tu marca va a ser la leche con el marketing de influencers!"
  },
  contact: {
    title: "¿Te mola lo que ves?",
    description: "¡Venga, ponte en contacto y curramos juntos para que tu marca sea la caña!",
    customPlan: "¿Buscas algo más a tu rollo?"
  }
};

export const content = {
  LATAM: latamContent,
  EUROPE: europeContent
}; 