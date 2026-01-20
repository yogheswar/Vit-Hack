import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

export const DashboardHeader = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="h-20 glass border-b border-border/50 flex items-center justify-between px-8">
      <div className="flex items-center gap-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {t('dashboard')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('welcome_back')}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('search_placeholder')}
            className="pl-10 w-64 h-10 bg-secondary/50"
          />
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50">
          <span
            className={`text-xs font-medium cursor-pointer hover:text-primary ${language === 'en' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setLanguage('en')}
          >
            EN
          </span>
          <span className="text-xs text-muted-foreground">/</span>
          <span
            className={`text-xs font-medium cursor-pointer hover:text-primary ${language === 'ta' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setLanguage('ta')}
          >
            TA
          </span>
          <span className="text-xs text-muted-foreground">/</span>
          <span
            className={`text-xs font-medium cursor-pointer hover:text-primary ${language === 'hi' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setLanguage('hi')}
          >
            HI
          </span>
          <span className="text-[10px] text-muted-foreground ml-1">(Translate)</span>
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full gradient-sun" />
        </Button>

        <div className="h-10 w-10 rounded-full gradient-solar flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
          <User className="h-5 w-5 text-primary-foreground" />
        </div>
      </div>
    </header>
  );
};
