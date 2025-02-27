export const getInitials = (name) => {
  const words = name.trim().split(/\s+/);
  if(words.length === 1) {
    return words[0][0].toUpperCase();
  } else {
    return (words[0][0] + words[1][0]).toUpperCase();
  }

}