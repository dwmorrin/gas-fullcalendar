export default function SelectedCalendars() {
  const store = PropertiesService.getUserProperties();
  return {
    getStoredProperties(calendar) {
      return {
        ...calendar,
        checked: store.getProperty(calendar.id),
        order: Number(store.getProperty(calendar.id + "ORDER") || 0),
      };
    },
    setOrder(calendar) {
      if (calendar.order)
        store.setProperty(calendar.id + "ORDER", String(calendar.order));
      else store.deleteProperty(calendar.id + "ORDER");
    },
    setSelected(calendar) {
      if (calendar.checked) store.setProperty(calendar.id, "true");
      else store.deleteProperty(calendar.id);
    },
  };
}
