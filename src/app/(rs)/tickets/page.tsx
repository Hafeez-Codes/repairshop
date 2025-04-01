import TicketSearch from '@/app/(rs)/tickets/TicketSearch';
import { getOpenTickets } from '@/lib/queries/getOpenTickets';
import { getTicketSearchResults } from '@/lib/queries/getTicketSearchResult';
import TicketTable from '@/app/(rs)/tickets/TicketTable';

export const metadata = {
	title: 'Ticket Search',
};

export default async function Ticket({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const { searchText } = await searchParams;

	if (!searchText) {
		const results = await getOpenTickets();

		return (
			<>
				<TicketSearch />
				{results.length ? (
					<TicketTable data={results} />
				) : (
					<p className="mt-4">No open results found</p>
				)}
			</>
		);
	}

	const results = await getTicketSearchResults(searchText);

	return (
		<>
			<TicketSearch />
			{results.length ? (
				<TicketTable data={results} />
			) : (
				<p className="mt-4">No results found</p>
			)}
		</>
	);
}
