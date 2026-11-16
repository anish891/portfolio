import { socialLinks, heroContent } from "@/lib/data";

export function Footer() {
  return (
    <footer className="wrap ui muted mt-20 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line pt-5">
        <p>
          © {new Date().getFullYear()} {heroContent.name}
        </p>
        <ul className="dots flex flex-wrap">
          {socialLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1 text-muted hover:text-text"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <a href="/feed.xml" className="inline-block py-1 text-muted hover:text-text">
              RSS
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
