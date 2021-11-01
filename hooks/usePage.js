import useSWR from "swr"

import { fetcher } from "../utils/fetcher"
import { PATHS } from "../constants/api";

export const usePage = (id) => {
	const { data, error } = useSWR(id ? `${PATHS.PAGES.INDEX}/${id}` : null, fetcher)

	return {
		page: data,
		isLoading: !error && !data,
		isError: error
	}
}
