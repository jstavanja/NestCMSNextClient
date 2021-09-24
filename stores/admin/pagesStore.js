import { observable, action } from 'mobx'
import { createContext } from 'react'
import { index as fetchPages, destroy as deletePage } from '../../services/pages'

class PagesStore {
	@observable pages = []

	@action async fetchPages() {
		try {
			const pages = await fetchPages()
			this.pages = pages
		} catch (error) {
			console.info('Something went wrong when trying to fetch all pages from the server.', error)
		}
	}

	@action async deletePage(pageId) {
		try {
			await deletePage(pageId)
			this.pages = this.pages.filter((page) => page.id !== pageId)
		} catch (error) {
			console.info('Something went wrong when trying to delete a page')
		}
	}
}

export const instance = new PagesStore()

export default createContext(instance)
