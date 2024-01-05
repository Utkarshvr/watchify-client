import { Link } from "react-router-dom";

export function getMenuItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const renderDescription = (desc) => {
  const linkRegex = /(https?:\/\/[^\s]+)/g;

  const parts = desc.split(linkRegex);

  return parts.map((part, index) => {
    if (index % 2 === 0) {
      return <span key={index}>{part}</span>;
    } else {
      const url = part.trim();
      return (
        <Link key={index} to={url} target="_blank">
          {url}
        </Link>
      );
    }
  });
};
