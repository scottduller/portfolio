const Vr = ({ className, ...rest }: { className?: string } & React.HTMLProps<HTMLDivElement>) => {
  return (
    <div className={`vr ${className}`} {...rest} />
  );
};

export default Vr;
