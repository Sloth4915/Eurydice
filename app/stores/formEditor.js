export const useEventStore = defineStore("event", {
    state: () => ({
        name: "",
        
        fields: [],
        components: {},
        timed: false,
        timedFields: []
    }),
})
