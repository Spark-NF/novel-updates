import { IReadingListResult, IReadingListResultChapter } from "./NovelUpdatesClient";
import { WebNavigationListener } from "./WebNavigationListener";

function removeProtocol(url: string): string {
    if (url.startsWith("http:")) {
        return url.substring(5);
    }
    if (url.startsWith("https:")) {
        return url.substring(6);
    }
    return url;
}

export class ReadChapterListener extends WebNavigationListener {
    constructor(
        private novelsGetter: () => Promise<IReadingListResult[]>,
        private callback: (novel: IReadingListResult, chapter: IReadingListResultChapter) => Promise<void>,
    ) {
        super();
    }

    protected async onCommitted(data: any): Promise<void> {
        // Ignore iframe navigation
        if (data.frameId !== 0) {
            return;
        }

        const tabId: string = "tabUrl_" + data.tabId.toString();
        if (tabId in window.sessionStorage) {
            const oldUrl = window.sessionStorage[tabId];
            const readingList = await this.novelsGetter();
            for (const novel of readingList) {
                if (novel.nextLength >= 1
                    && novel.status.url
                    && novel.next.url
                    && removeProtocol(novel.status.url) === removeProtocol(oldUrl)
                    && removeProtocol(novel.next.url) === removeProtocol(data.url)
                ) {
                    await this.callback(novel, novel.next);
                }
            }
        }

        window.sessionStorage[tabId] = data.url;
    }
}
