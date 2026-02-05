import { CheckCircle2, Calendar, Award, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface RegistrationStatusCardProps {
  registration: {
    email: string;
    full_name: string;
    test_type: 'ielts' | 'toefl' | 'toeic' | 'sat';
    registration_date: string;
    access_status: 'active' | 'expired';
  };
  className?: string;
}

export default function RegistrationStatusCard({ registration, className }: RegistrationStatusCardProps) {
  const isActive = registration.access_status === 'active';
  
  // Calculate registration number (mock - can be actual from DB)
  const registrationNumber = `IELS-${registration.test_type.toUpperCase()}-${new Date(registration.registration_date).getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  return (
    <div className={cn(
      "bg-[#577E90] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden",
      className
    )}>
      {/* Dekorasi halus agar tidak terlalu flat */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        
        {/* Left: Status Info */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-semibold mb-4">
            <CheckCircle2 size={14} />
            {isActive ? 'Active Registration' : 'Expired'}
          </div>
          
          <h2 className="text-2xl font-bold mb-2">
            Welcome, {registration.full_name}!
          </h2>
          <p className="text-white/90 text-lg mb-4">
            You're registered for <strong>{registration.test_type.toUpperCase()}</strong> Test
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs text-white/70">Registered Email</p>
                <p className="text-sm font-semibold">{registration.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-xs text-white/70">Registration Date</p>
                <p className="text-sm font-semibold">
                  {new Date(registration.registration_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Registration Badge */}
        <div className="w-full md:w-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center shadow-inner">
          <Award size={40} className="mx-auto mb-3 text-white/90" />
          <p className="text-xs text-white/70 mb-1 tracking-wider uppercase">Registration No.</p>
          <p className="text-lg font-bold font-mono tracking-tight">{registrationNumber}</p>
        </div>
      </div>
    </div>
  );
}