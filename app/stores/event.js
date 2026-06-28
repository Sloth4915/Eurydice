export const useEventStore = defineStore("event", {
    state: () => ({
        eventCode: null,
        matches: [],
        forms: []
    }),
})
