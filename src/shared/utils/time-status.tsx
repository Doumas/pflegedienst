// time-status.ts (enthält nur Logik, kein React)

export const isHoliday = (date: Date): boolean => {
    const day = date.getDay();
    if (day === 0 || day === 6) return true; // Sonntag (0) oder Samstag (6)
    // Hier könnten komplexere Abfragen für Feiertage stehen
    return false; 
};

export const getTimeStatus = (date: Date) => {
    // Definieren des Rückgabe-Typs (optional, aber gut)
    interface TimeStatus {
        state: 'red' | 'green' | 'amber';
        text: string;
        color: string;
        dot: string;
    }

    if (isHoliday(date)) {
        return { 
            state: 'red', 
            text: 'Feiertag: Nur für Notfälle erreichbar.', 
            color: 'text-red-600', 
            dot: 'bg-red-500' 
        } as TimeStatus;
    }
    
    const hour = date.getHours();
    if (hour >= 10 && hour < 16) { 
        return { 
            state: 'green', 
            text: 'Antwort in wenigen Minuten.', 
            color: 'text-green-600', 
            dot: 'bg-green-500' 
        } as TimeStatus;
    } else {
        return { 
            state: 'amber', 
            text: 'Office geschlossen. Antwort verzögert.', 
            color: 'text-slate-600', 
            dot: 'bg-amber-500' 
        } as TimeStatus;
    }
};