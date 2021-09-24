import { observable, action } from 'mobx'
import { createContext } from 'react'
import { index as fetchPages, destroy as deletePage } from '../services/pages'

class PagesStore {
	@observable pages = []

	@action async fetchPages() {
		const pages = await fetchPages()
		this.pages = pages
	}

	@action async deletePage(pageId) {
		await deletePage(pageId)
		this.pages = this.pages.filter((page) => page.id !== pageId)
	}
}

export const instance = new PagesStore()

export default createContext(instance)
