import { Language } from '../types';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.calculator': 'Calculator',
    'nav.tracker': 'Tracker',
    'nav.family': 'Family',
    'nav.leaderboard': 'Leaderboard',
    'nav.about': 'About',
    
    // Home Page
    'home.title': 'Carbon Footprint Calculator',
    'home.subtitle': 'for Households',
    'home.description': 'Estimate your household\'s carbon emissions and discover personalized ways to reduce them through energy-efficient living and sustainable choices.',
    'home.cta.start': 'Start Calculating',
    'home.cta.learn': 'Learn More',
    
    // Calculator
    'calc.title': 'Calculate Your Carbon Footprint',
    'calc.description': 'Enter your household information to estimate your annual CO₂ emissions',
    'calc.electricity': 'Electricity Usage',
    'calc.electricity.monthly': 'Monthly electricity usage (kWh)',
    'calc.transportation': 'Transportation',
    'calc.transport.distance': 'Weekly driving distance (km)',
    'calc.transport.vehicle': 'Vehicle type',
    'calc.diet': 'Diet',
    'calc.diet.type': 'Diet type',
    'calc.household': 'Household',
    'calc.household.size': 'Number of people in household',
    'calc.location': 'Location',
    'calc.location.select': 'Select your country',
    'calc.submit': 'Calculate My Footprint',
    
    // Results
    'results.title': 'Your Carbon Footprint Results',
    'results.description': 'Based on your household data, here\'s your estimated annual CO₂ emissions',
    'results.total': 'Total Annual CO₂',
    'results.electricity': 'Electricity',
    'results.transportation': 'Transportation',
    'results.diet': 'Diet',
    'results.per.person': 'Per Person',
    'results.breakdown': 'Emission Breakdown',
    'results.ecotips': 'Personalized Eco-Tips',
    'results.recalculate': 'Recalculate',
    'results.download': 'Download Report',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.close': 'Close',
  },
  
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.calculator': 'कैलकुलेटर',
    'nav.tracker': 'ट्रैकर',
    'nav.family': 'परिवार',
    'nav.leaderboard': 'लीडरबोर्ड',
    'nav.about': 'के बारे में',
    
    // Home Page
    'home.title': 'कार्बन फुटप्रिंट कैलकुलेटर',
    'home.subtitle': 'घरों के लिए',
    'home.description': 'अपने घर के कार्बन उत्सर्जन का अनुमान लगाएं और ऊर्जा-कुशल जीवन और टिकाऊ विकल्पों के माध्यम से उन्हें कम करने के व्यक्तिगत तरीके खोजें।',
    'home.cta.start': 'गणना शुरू करें',
    'home.cta.learn': 'और जानें',
    
    // Calculator
    'calc.title': 'अपना कार्बन फुटप्रिंट गणना करें',
    'calc.description': 'अपने वार्षिक CO₂ उत्सर्जन का अनुमान लगाने के लिए अपने घर की जानकारी दर्ज करें',
    'calc.electricity': 'बिजली का उपयोग',
    'calc.electricity.monthly': 'मासिक बिजली का उपयोग (kWh)',
    'calc.transportation': 'परिवहन',
    'calc.transport.distance': 'साप्ताहिक ड्राइविंग दूरी (km)',
    'calc.transport.vehicle': 'वाहन का प्रकार',
    'calc.diet': 'आहार',
    'calc.diet.type': 'आहार का प्रकार',
    'calc.household': 'घर',
    'calc.household.size': 'घर में लोगों की संख्या',
    'calc.location': 'स्थान',
    'calc.location.select': 'अपना देश चुनें',
    'calc.submit': 'मेरा फुटप्रिंट गणना करें',
    
    // Results
    'results.title': 'आपके कार्बन फुटप्रिंट परिणाम',
    'results.description': 'आपके घर के डेटा के आधार पर, यहाँ आपका अनुमानित वार्षिक CO₂ उत्सर्जन है',
    'results.total': 'कुल वार्षिक CO₂',
    'results.electricity': 'बिजली',
    'results.transportation': 'परिवहन',
    'results.diet': 'आहार',
    'results.per.person': 'प्रति व्यक्ति',
    'results.breakdown': 'उत्सर्जन विभाजन',
    'results.ecotips': 'व्यक्तिगत पर्यावरण सुझाव',
    'results.recalculate': 'पुनः गणना करें',
    'results.download': 'रिपोर्ट डाउनलोड करें',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.save': 'सेव करें',
    'common.cancel': 'रद्द करें',
    'common.delete': 'हटाएं',
    'common.edit': 'संपादित करें',
    'common.add': 'जोड़ें',
    'common.close': 'बंद करें',
  },
  
  te: {
    // Navigation
    'nav.home': 'హోమ్',
    'nav.calculator': 'కాలిక్యులేటర్',
    'nav.tracker': 'ట్రాకర్',
    'nav.family': 'కుటుంబం',
    'nav.leaderboard': 'లీడర్‌బోర్డ్',
    'nav.about': 'గురించి',
    
    // Home Page
    'home.title': 'కార్బన్ ఫుట్‌ప్రింట్ కాలిక్యులేటర్',
    'home.subtitle': 'గృహాల కోసం',
    'home.description': 'మీ గృహ కార్బన్ ఉద్గారాలను అంచనా వేయండి మరియు శక్తి-సమర్థవంతమైన జీవనం మరియు స్థిరమైన ఎంపికల ద్వారా వాటిని తగ్గించడానికి వ్యక్తిగతీకరించిన మార్గాలను కనుగొనండి.',
    'home.cta.start': 'లెక్కింపు ప్రారంభించండి',
    'home.cta.learn': 'మరింత తెలుసుకోండి',
    
    // Calculator
    'calc.title': 'మీ కార్బన్ ఫుట్‌ప్రింట్‌ను లెక్కించండి',
    'calc.description': 'మీ వార్షిక CO₂ ఉద్గారాలను అంచనా వేయడానికి మీ గృహ సమాచారాన్ని నమోదు చేయండి',
    'calc.electricity': 'విద్యుత్ వినియోగం',
    'calc.electricity.monthly': 'నెలవారీ విద్యుత్ వినియోగం (kWh)',
    'calc.transportation': 'రవాణా',
    'calc.transport.distance': 'వారపు డ్రైవింగ్ దూరం (km)',
    'calc.transport.vehicle': 'వాహన రకం',
    'calc.diet': 'ఆహారం',
    'calc.diet.type': 'ఆహార రకం',
    'calc.household': 'గృహం',
    'calc.household.size': 'గృహంలో వ్యక్తుల సంఖ్య',
    'calc.location': 'స్థానం',
    'calc.location.select': 'మీ దేశాన్ని ఎంచుకోండి',
    'calc.submit': 'నా ఫుట్‌ప్రింట్‌ను లెక్కించండి',
    
    // Results
    'results.title': 'మీ కార్బన్ ఫుట్‌ప్రింట్ ఫలితాలు',
    'results.description': 'మీ గృహ డేటా ఆధారంగా, ఇక్కడ మీ అంచనా వార్షిక CO₂ ఉద్గారాలు ఉన్నాయి',
    'results.total': 'మొత్తం వార్షిక CO₂',
    'results.electricity': 'విద్యుత్',
    'results.transportation': 'రవాణా',
    'results.diet': 'ఆహారం',
    'results.per.person': 'వ్యక్తికి',
    'results.breakdown': 'ఉద్గార విభజన',
    'results.ecotips': 'వ్యక్తిగత పర్యావరణ చిట్కాలు',
    'results.recalculate': 'మళ్లీ లెక్కించండి',
    'results.download': 'రిపోర్ట్ డౌన్‌లోడ్ చేయండి',
    
    // Common
    'common.loading': 'లోడ్ అవుతోంది...',
    'common.error': 'లోపం',
    'common.save': 'సేవ్ చేయండి',
    'common.cancel': 'రద్దు చేయండి',
    'common.delete': 'తొలగించండి',
    'common.edit': 'సవరించండి',
    'common.add': 'జోడించండి',
    'common.close': 'మూసివేయండి',
  },
  
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.calculator': 'Calculadora',
    'nav.tracker': 'Seguimiento',
    'nav.family': 'Familia',
    'nav.leaderboard': 'Clasificación',
    'nav.about': 'Acerca de',
    
    // Home Page
    'home.title': 'Calculadora de Huella de Carbono',
    'home.subtitle': 'para Hogares',
    'home.description': 'Estima las emisiones de carbono de tu hogar y descubre formas personalizadas de reducirlas a través de una vida eficiente en energía y opciones sostenibles.',
    'home.cta.start': 'Comenzar Cálculo',
    'home.cta.learn': 'Saber Más',
    
    // Calculator
    'calc.title': 'Calcula tu Huella de Carbono',
    'calc.description': 'Ingresa la información de tu hogar para estimar tus emisiones anuales de CO₂',
    'calc.electricity': 'Uso de Electricidad',
    'calc.electricity.monthly': 'Uso mensual de electricidad (kWh)',
    'calc.transportation': 'Transporte',
    'calc.transport.distance': 'Distancia semanal de conducción (km)',
    'calc.transport.vehicle': 'Tipo de vehículo',
    'calc.diet': 'Dieta',
    'calc.diet.type': 'Tipo de dieta',
    'calc.household': 'Hogar',
    'calc.household.size': 'Número de personas en el hogar',
    'calc.location': 'Ubicación',
    'calc.location.select': 'Selecciona tu país',
    'calc.submit': 'Calcular Mi Huella',
    
    // Results
    'results.title': 'Resultados de tu Huella de Carbono',
    'results.description': 'Basado en los datos de tu hogar, aquí están tus emisiones anuales estimadas de CO₂',
    'results.total': 'CO₂ Anual Total',
    'results.electricity': 'Electricidad',
    'results.transportation': 'Transporte',
    'results.diet': 'Dieta',
    'results.per.person': 'Por Persona',
    'results.breakdown': 'Desglose de Emisiones',
    'results.ecotips': 'Consejos Ecológicos Personalizados',
    'results.recalculate': 'Recalcular',
    'results.download': 'Descargar Reporte',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.add': 'Agregar',
    'common.close': 'Cerrar',
  },
  
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.calculator': 'Calculatrice',
    'nav.tracker': 'Suivi',
    'nav.family': 'Famille',
    'nav.leaderboard': 'Classement',
    'nav.about': 'À propos',
    
    // Home Page
    'home.title': 'Calculatrice d\'Empreinte Carbone',
    'home.subtitle': 'pour les Ménages',
    'home.description': 'Estimez les émissions de carbone de votre foyer et découvrez des moyens personnalisés de les réduire grâce à une vie économe en énergie et des choix durables.',
    'home.cta.start': 'Commencer le Calcul',
    'home.cta.learn': 'En Savoir Plus',
    
    // Calculator
    'calc.title': 'Calculez votre Empreinte Carbone',
    'calc.description': 'Entrez les informations de votre foyer pour estimer vos émissions annuelles de CO₂',
    'calc.electricity': 'Consommation d\'Électricité',
    'calc.electricity.monthly': 'Consommation mensuelle d\'électricité (kWh)',
    'calc.transportation': 'Transport',
    'calc.transport.distance': 'Distance hebdomadaire de conduite (km)',
    'calc.transport.vehicle': 'Type de véhicule',
    'calc.diet': 'Régime',
    'calc.diet.type': 'Type de régime',
    'calc.household': 'Foyer',
    'calc.household.size': 'Nombre de personnes dans le foyer',
    'calc.location': 'Localisation',
    'calc.location.select': 'Sélectionnez votre pays',
    'calc.submit': 'Calculer Mon Empreinte',
    
    // Results
    'results.title': 'Résultats de votre Empreinte Carbone',
    'results.description': 'Basé sur les données de votre foyer, voici vos émissions annuelles estimées de CO₂',
    'results.total': 'CO₂ Annuel Total',
    'results.electricity': 'Électricité',
    'results.transportation': 'Transport',
    'results.diet': 'Régime',
    'results.per.person': 'Par Personne',
    'results.breakdown': 'Répartition des Émissions',
    'results.ecotips': 'Conseils Écologiques Personnalisés',
    'results.recalculate': 'Recalculer',
    'results.download': 'Télécharger le Rapport',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.save': 'Sauvegarder',
    'common.cancel': 'Annuler',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.add': 'Ajouter',
    'common.close': 'Fermer',
  },
  
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.calculator': 'Rechner',
    'nav.tracker': 'Tracker',
    'nav.family': 'Familie',
    'nav.leaderboard': 'Bestenliste',
    'nav.about': 'Über uns',
    
    // Home Page
    'home.title': 'CO₂-Fußabdruck-Rechner',
    'home.subtitle': 'für Haushalte',
    'home.description': 'Schätzen Sie die Kohlenstoffemissionen Ihres Haushalts und entdecken Sie personalisierte Wege, diese durch energieeffizientes Leben und nachhaltige Entscheidungen zu reduzieren.',
    'home.cta.start': 'Berechnung Starten',
    'home.cta.learn': 'Mehr Erfahren',
    
    // Calculator
    'calc.title': 'Berechnen Sie Ihren CO₂-Fußabdruck',
    'calc.description': 'Geben Sie Ihre Haushaltsinformationen ein, um Ihre jährlichen CO₂-Emissionen zu schätzen',
    'calc.electricity': 'Stromverbrauch',
    'calc.electricity.monthly': 'Monatlicher Stromverbrauch (kWh)',
    'calc.transportation': 'Transport',
    'calc.transport.distance': 'Wöchentliche Fahrstrecke (km)',
    'calc.transport.vehicle': 'Fahrzeugtyp',
    'calc.diet': 'Ernährung',
    'calc.diet.type': 'Ernährungstyp',
    'calc.household': 'Haushalt',
    'calc.household.size': 'Anzahl der Personen im Haushalt',
    'calc.location': 'Standort',
    'calc.location.select': 'Wählen Sie Ihr Land',
    'calc.submit': 'Meinen Fußabdruck Berechnen',
    
    // Results
    'results.title': 'Ihre CO₂-Fußabdruck-Ergebnisse',
    'results.description': 'Basierend auf Ihren Haushaltsdaten sind hier Ihre geschätzten jährlichen CO₂-Emissionen',
    'results.total': 'Gesamt-CO₂ Jährlich',
    'results.electricity': 'Strom',
    'results.transportation': 'Transport',
    'results.diet': 'Ernährung',
    'results.per.person': 'Pro Person',
    'results.breakdown': 'Emissionsaufschlüsselung',
    'results.ecotips': 'Personalisierte Öko-Tipps',
    'results.recalculate': 'Neu Berechnen',
    'results.download': 'Bericht Herunterladen',
    
    // Common
    'common.loading': 'Laden...',
    'common.error': 'Fehler',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.delete': 'Löschen',
    'common.edit': 'Bearbeiten',
    'common.add': 'Hinzufügen',
    'common.close': 'Schließen',
  },
};