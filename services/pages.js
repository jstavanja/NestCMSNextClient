import api from "../api";
import { PATHS } from "../constants/api";

export const index = () => api.get(PATHS.PAGES.INDEX).json()

export const show = pageId => {
	const pageURL = `${PATHS.PAGES.INDEX}/${pageId}`
	return api.get(pageURL).json()
}

export const store = data => {
	return api.post(PATHS.PAGES.INDEX, {
		json: data
	}).json()
}

export const update = (pageId, newData) => {
	const pageURL = `${PATHS.PAGES.INDEX}/${pageId}`
	return api.put(pageURL, {
		json: newData
	}).json()
}

export const destroy = (pageId) => {
	const pageURL = `${PATHS.PAGES.INDEX}/${pageId}`
	return api.delete(pageURL).json()
}
