interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`max-w-[1300px] mx-auto px-5 md:px-12 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
