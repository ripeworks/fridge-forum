type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return <main className="max-w-5xl mx-auto px-4 py-10">{children}</main>;
}
