export const navigateTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const offset = 88; // Adjust this value as needed
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });
  }
};
