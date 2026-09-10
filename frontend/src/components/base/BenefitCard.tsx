interface BenefitCardProps {
  icon: string;
  title: string;
  description?: string;
  light?: boolean;
}

export default function BenefitCard({ icon, title, description, light = false }: BenefitCardProps) {
  return (
    <div className={`group p-5 rounded-lg transition-all duration-400 cursor-default card-scale-hover ${
      light
        ? 'bg-secondary-600/60 hover:bg-primary-500'
        : 'bg-background-50 hover:bg-primary-500 border border-background-200/70'
    }`}>
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 group-hover:bg-background-50/20 transition-colors duration-400">
        <i className={`${icon} text-lg text-primary-600 group-hover:text-background-50 transition-colors duration-400`}></i>
      </div>
      <h4 className={`mt-3 text-sm md:text-base font-semibold font-heading transition-colors duration-400 ${
        light ? 'text-background-50' : 'text-foreground-900'
      } group-hover:text-background-50`}>
        {title}
      </h4>
      {description && (
        <p className={`mt-1.5 text-xs md:text-sm leading-relaxed transition-colors duration-400 ${
          light ? 'text-background-50/70' : 'text-foreground-600'
        } group-hover:text-background-50/80`}>
          {description}
        </p>
      )}
    </div>
  );
}