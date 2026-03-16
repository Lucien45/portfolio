import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

type TimeSlot = string;
type DateString = string;
type AvailableSlots = Record<DateString, TimeSlot[]>;

const availableSlots: AvailableSlots = {
  '2025-01-15': ['09:00', '10:30', '14:00', '15:30'],
  '2025-01-16': ['09:00', '11:00', '14:00'],
  '2025-01-17': ['10:00', '14:00', '16:00'],
  '2025-01-20': ['09:00', '10:30', '13:00', '15:00'],
  '2025-01-21': ['09:00', '11:00', '14:30'],
  '2025-01-22': ['10:00', '14:00', '15:30', '16:30'],
  '2025-01-23': ['09:00', '13:00', '15:00'],
  '2025-01-24': ['10:30', '14:00', '16:00']
};

interface TimeZone {
  value: string;
  label: string;
  primary?: boolean;
}

const timeZones: TimeZone[] = [
  { value: 'UTC+3', label: 'Madagascar (UTC+3)', primary: true },
  { value: 'UTC+1', label: 'Europe Centrale (UTC+1)' },
  { value: 'UTC+0', label: 'Londres (UTC+0)' },
  { value: 'UTC-5', label: 'New York (UTC-5)' }
];

const AvailabilityCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>('UTC+3');

  const getDaysInMonth = (date: Date): (Date | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const formatDate = (date: Date | null): string => {
    return date ? date.toISOString().split('T')[0] : '';
  };

  const isDateAvailable = (date: Date | null): boolean => {
    if (!date) return false;
    const dateStr = formatDate(date);
    return !!availableSlots[dateStr] && availableSlots[dateStr].length > 0;
  };

  const isPastDate = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateSelect = (date: Date | null): void => {
    if (!date || isPastDate(date) || !isDateAvailable(date)) return;
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: TimeSlot): void => {
    setSelectedTime(time);
  };

  const handleBooking = (): void => {
    if (selectedDate && selectedTime) {
      alert(
        `Consultation programmée pour le ${selectedDate.toLocaleDateString('fr-FR')} à ${selectedTime} (${selectedTimeZone})`
      );
    }
  };

  const navigateMonth = (direction: number): void => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  return (
    <div className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Planifier une Consultation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Réservez un créneau pour discuter de votre projet en détail
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth(-1)}
                    iconName="ChevronLeft"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth(1)}
                    iconName="ChevronRight"
                  />
                </div>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((date, index) => {
                  if (!date) {
                    return <div key={index} className="h-12"></div>;
                  }

                  const isAvailable = isDateAvailable(date);
                  const isPast = isPastDate(date);
                  const isSelected = selectedDate && formatDate(selectedDate) === formatDate(date);

                  return (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(date)}
                      disabled={isPast || !isAvailable}
                      className={`h-12 text-sm font-medium rounded-lg transition-all ${
                        isSelected
                          ? 'bg-primary text-primary-foreground shadow-soft'
                          : isAvailable && !isPast
                          ? 'bg-success/10 text-success hover:bg-success/20 border border-success/20'
                          : isPast
                          ? 'text-muted-foreground/50 cursor-not-allowed'
                          : 'text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success/20 border border-success/20 rounded"></div>
                  <span className="text-muted-foreground">Disponible</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded"></div>
                  <span className="text-muted-foreground">Sélectionné</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-muted rounded"></div>
                  <span className="text-muted-foreground">Indisponible</span>
                </div>
              </div>
            </div>
          </div>

          {/* Time Slots & Booking */}
          <div className="space-y-6">
            {/* Time Zone Selection */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Fuseau Horaire
              </h3>
              <div className="space-y-2">
                {timeZones.map(tz => (
                  <label
                    key={tz.value}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedTimeZone === tz.value
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="timezone"
                      value={tz.value}
                      checked={selectedTimeZone === tz.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedTimeZone(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">
                        {tz.label}
                      </div>
                      {tz.primary && (
                        <div className="text-xs text-primary">Recommandé</div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Créneaux Disponibles
                </h3>
                <div className="text-sm text-muted-foreground mb-4">
                  {selectedDate.toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {availableSlots[formatDate(selectedDate)]?.map((time: TimeSlot) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`p-3 text-sm font-medium rounded-lg border transition-all ${
                        selectedTime === time
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary/50 hover:bg-primary/5'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Booking Confirmation */}
            {selectedDate && selectedTime && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Confirmer la Réservation
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="Calendar" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">
                      {selectedDate.toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">
                      {selectedTime} ({selectedTimeZone})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="Video" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">Visioconférence</span>
                  </div>
                </div>
                <Button
                  variant="default"
                  fullWidth
                  onClick={handleBooking}
                  iconName="CheckCircle"
                  iconPosition="left"
                >
                  Confirmer la Consultation
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
              <Icon name="Clock" size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Durée: 30-60 minutes
            </h3>
            <p className="text-sm text-muted-foreground">
              Consultation adaptée à vos besoins
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mb-4">
              <Icon name="Video" size={24} className="text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Visioconférence
            </h3>
            <p className="text-sm text-muted-foreground">
              Google Meet ou Zoom selon préférence
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4">
              <Icon name="FileText" size={24} className="text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Suivi Personnalisé
            </h3>
            <p className="text-sm text-muted-foreground">
              Rapport et recommandations inclus
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;