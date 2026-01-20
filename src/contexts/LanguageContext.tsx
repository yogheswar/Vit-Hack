import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ta' | 'hi';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        // Sidebar
        'dashboard': 'Dashboard',
        'defects': 'Defects',
        'analytics': 'Analytics',
        'settings': 'Settings',
        'help': 'Help',
        'sign_out': 'Sign Out',

        // Header
        'welcome_back': "Welcome back! Here's your solar system overview.",
        'search_placeholder': 'Search...',

        // Widgets - Weather
        'weather_forecast': 'Weather & Forecast',
        'partly_cloudy': 'Partly Cloudy',
        'solar_irradiance': 'Solar Irradiance',
        'uv_index': 'UV Index',
        'high': 'High',
        'tomorrow': 'Tomorrow',
        'wednesday': 'Wednesday',
        'thursday': 'Thursday',
        'weather_api': 'Weather API',

        // Widgets - Quick Stats
        'quick_stats': 'Quick Stats',
        'savings_this_month': 'Savings This Month',
        'co2_offset': 'CO₂ Offset',
        'battery_level': 'Battery Level',
        'charging': 'Charging',

        // Dashboard Main
        'current_output': 'Current Output',
        'real_time_power': 'Real-time power',
        'todays_production': "Today's Production",
        'total_energy_generated': 'Total energy generated',
        'battery_storage': 'Battery Storage',
        'available': 'available',
        'self_sufficiency': 'Self-Sufficiency',
        'this_month': 'This month',
        'energy_flow': 'Energy Flow',
        'todays_production_vs_consumption': "Today's production vs consumption",
        'production': 'Production',
        'consumption': 'Consumption',

        // Settings
        'manage_account': 'Manage your account settings and preferences.',
        'profile_information': 'Profile Information',
        'update_photo_details': 'Update your photo and personal details.',
        'profile_photo': 'Profile Photo',
        'recommended_format': 'Recommended: Square JPG, PNG. Max 2MB.',
        'change': 'Change',
        'remove': 'Remove',
        'first_name': 'First Name',
        'last_name': 'Last Name',
        'email_address': 'Email Address',
        'phone_number': 'Phone Number',
        'address': 'Address',
        'cancel': 'Cancel',
        'save_changes': 'Save Changes',
        'saving': 'Saving...',
        'settings_saved': 'Settings saved',
        'profile_updated': 'Your profile information has been updated successfully.'
    },
    ta: {
        // Sidebar
        'dashboard': 'முகப்பு',
        'defects': 'குறைபாடுகள்',
        'analytics': 'பகுப்பாய்வு',
        'settings': 'அமைப்புகள்',
        'help': 'உதவி',
        'sign_out': 'வெளியேறு',

        // Header
        'welcome_back': 'மீண்டும் வருக! உங்கள் சூரிய ஆற்றல் அமைப்பின் கண்ணோட்டம் இங்கே.',
        'search_placeholder': 'தேடுக...',

        // Widgets - Weather
        'weather_forecast': 'வானிலை & முன்னறிவிப்பு',
        'partly_cloudy': 'பகுதி மேகமூட்டம்',
        'solar_irradiance': 'சூரிய கதிர்வீச்சு',
        'uv_index': 'UV குறியீடு',
        'high': 'அதிகம்',
        'tomorrow': 'நாளை',
        'wednesday': 'புதன்',
        'thursday': 'வியாழன்',
        'weather_api': 'வானிலை ஏபிஐ',

        // Widgets - Quick Stats
        'quick_stats': 'விரைவு புள்ளிவிவரங்கள்',
        'savings_this_month': 'இந்த மாத சேமிப்பு',
        'co2_offset': 'CO₂ குறைப்பு',
        'battery_level': 'பேட்டரி நிலை',
        'charging': 'சார்ஜ் ஆகிறது',

        // Dashboard Main
        'current_output': 'தற்போதைய வெளியீடு',
        'real_time_power': 'நிகழ்நேர மின்சாரம்',
        'todays_production': 'இன்றைய உற்பத்தி',
        'total_energy_generated': 'மொத்த உற்பத்தி',
        'battery_storage': 'பேட்டரி சேமிப்பு',
        'available': 'கிடைக்கக்கூடியது',
        'self_sufficiency': 'சுயச்சார்பு',
        'this_month': 'இந்த மாதம்',
        'energy_flow': 'ஆற்றல் ஓட்டம்',
        'todays_production_vs_consumption': 'இன்றைய உற்பத்தி vs நுகர்வு',
        'production': 'உற்பத்தி',
        'consumption': 'நுகர்வு',

        // Settings
        'manage_account': 'உங்கள் கணக்கு அமைப்புகள் மற்றும் விருப்பங்களை நிர்வகிக்கவும்.',
        'profile_information': 'சுயவிவர தகவல்',
        'update_photo_details': 'உங்கள் புகைப்படம் மற்றும் தனிப்பட்ட விவரங்களை புதுப்பிக்கவும்.',
        'profile_photo': 'சுயவிவர புகைப்படம்',
        'recommended_format': 'பரிந்துரைக்கப்படுவது: சதுர JPG, PNG. அதிகபட்சம் 2MB.',
        'change': 'மாற்று',
        'remove': 'நீக்கு',
        'first_name': 'முதல் பெயர்',
        'last_name': 'கடைசி பெயர்',
        'email_address': 'மின்னஞ்சல் முகவரி',
        'phone_number': 'தொலைபேசி எண்',
        'address': 'முகவரி',
        'cancel': 'ரத்துசெய்',
        'save_changes': 'சேமி',
        'saving': 'சேமிக்கிறது...',
        'settings_saved': 'அமைப்புகள் சேமிக்கப்பட்டன',
        'profile_updated': 'உங்கள் சுயவிவரத் தகவல் வெற்றிகரமாகப் புதுப்பிக்கப்பட்டது.'
    },
    hi: {
        // Sidebar
        'dashboard': 'डैशबोर्ड',
        'defects': 'दोष',
        'analytics': 'विश्लेषण',
        'settings': 'सेटिंग्स',
        'help': 'सहायता',
        'sign_out': 'साइन आउट',

        // Header
        'welcome_back': 'वापसी पर स्वागत है! यहाँ आपके सौर ऊर्जा प्रणाली का अवलोकन है।',
        'search_placeholder': 'खोजें...',

        // Widgets - Weather
        'weather_forecast': 'मौसम और पूर्वानुमान',
        'partly_cloudy': 'आंशिक रूप से बादल',
        'solar_irradiance': 'सौर विकिरण',
        'uv_index': 'यूवी सूचकांक',
        'high': 'उच्च',
        'tomorrow': 'कल',
        'wednesday': 'बुधवार',
        'thursday': 'गुरुवार',
        'weather_api': 'मौसम एपीआई',

        // Widgets - Quick Stats
        'quick_stats': 'त्वरित आँकड़े',
        'savings_this_month': 'इस महीने की बचत',
        'co2_offset': 'CO₂ ऑफसेट',
        'battery_level': 'बैटरी स्तर',
        'charging': 'चार्ज हो रहा है',

        // Dashboard Main
        'current_output': 'वर्तमान आउटपुट',
        'real_time_power': 'वास्तविक समय बिजली',
        'todays_production': 'आज का उत्पादन',
        'total_energy_generated': 'कुल ऊर्जा उत्पादन',
        'battery_storage': 'बैटरी भंडारण',
        'available': 'उपलब्ध',
        'self_sufficiency': 'आत्मनिर्भरता',
        'this_month': 'इस महीने',
        'energy_flow': 'ऊर्जा प्रवाह',
        'todays_production_vs_consumption': 'आज का उत्पादन बनाम खपत',
        'production': 'उत्पादन',
        'consumption': 'खपत',

        // Settings
        'manage_account': 'अपनी खाता सेटिंग्स और प्राथमिकताओं को प्रबंधित करें।',
        'profile_information': 'प्रोफ़ाइल जानकारी',
        'update_photo_details': 'अपनी तस्वीर और व्यक्तिगत विवरण अपडेट करें।',
        'profile_photo': 'प्रोफ़ाइल तस्वीर',
        'recommended_format': 'अनुशंसित: स्क्वायर जेपीजी, पीएनजी। अधिकतम 2MB।',
        'change': 'बदलें',
        'remove': 'हटाएं',
        'first_name': 'पहला नाम',
        'last_name': 'अंतिम नाम',
        'email_address': 'ईमेल पता',
        'phone_number': 'फ़ोन नंबर',
        'address': 'पता',
        'cancel': 'रद्द करें',
        'save_changes': 'परिवर्तन सहेजें',
        'saving': 'सहेज रहा है...',
        'settings_saved': 'सेटिंग्स सहेजी गईं',
        'profile_updated': 'आपकी प्रोफ़ाइल जानकारी सफलतापूर्वक अपडेट कर दी गई है।'
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string) => {
        return translations[language][key as keyof typeof translations['en']] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
