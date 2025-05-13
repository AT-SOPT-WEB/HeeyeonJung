interface PageTitleProps {
  children: React.ReactNode;
}

const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <h1 className="text-center text-2xl font-bold mb-6">
      {children}
    </h1>
  );
};

export default PageTitle;