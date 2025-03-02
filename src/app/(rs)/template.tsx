export default async function Template({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="animate-[var(--animation-appear)]">{children}</div>;
}
