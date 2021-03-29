export default function SelectedCalendars() {
  const store = PropertiesService.getUserProperties();
  return {
    getSelected(calendar) {
      return {
        ...calendar,
        checked: store.getProperty(calendar.id),
      };
    },
    setSelected(calendar) {
      if (calendar.checked) store.setProperty(calendar.id, "true");
      else store.deleteProperty(calendar.id);
    },
  };
}
