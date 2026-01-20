import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  price: string;
  priceLabel?: string;
  className?: string;
}

export const ServiceCard = ({
  icon,
  title,
  description,
  features,
  price,
  priceLabel = "par séance",
  className = ""
}: ServiceCardProps) => {
  return (
    <Card className={`bg-gradient-card shadow-gentle hover:shadow-soft transition-all duration-300 group ${className}`}>
      <CardHeader className="space-y-4">
        <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div>
          <CardTitle className="text-xl mb-2">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
              {feature}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-2xl font-bold text-primary">{price}</span>
          <span className="text-sm text-muted-foreground">{priceLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
};