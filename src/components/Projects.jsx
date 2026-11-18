import { projects, shop } from '../data/shop';
import { useReveal } from '../hooks/useReveal';

function ProjectCard({ p }) {
  return (
    <article className="proj">
      {p.photo ? (
        <img className="proj-photo" src={p.photo} alt={`${p.car} — ${p.title}`} loading="lazy" />
      ) : (
        <div className="proj-photo proj-photo-empty" aria-hidden="true" />
      )}
      <div className="proj-body">
        <span className="proj-status">{p.status === 'current' ? 'In the bay' : 'Delivered'}</span>
        <h3>{p.title}</h3>
        <span className="proj-car">{p.car}</span>
        {p.summary && <p>{p.summary}</p>}
        {p.work?.length > 0 && (
          <ul>
            {p.work.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        )}
        {p.link && (
          <a className="proj-link" href={p.link} target="_blank" rel="noreferrer">
            See the build <span className="arrow">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}

function Group({ title, note, list }) {
  return (
    <div className="proj-group">
      <div className="proj-group-head">
        <h3>{title}</h3>
        <span>{note}</span>
      </div>
      {list.length ? (
        <div className="proj-grid">
          {list.map((p) => (
            <ProjectCard key={`${p.car}-${p.title}`} p={p} />
          ))}
        </div>
      ) : (
        <div className="proj-empty">
          Nothing posted here yet. Follow along on{' '}
          <a href={shop.links.instagram} target="_blank" rel="noreferrer">Instagram</a> and{' '}
          <a href={shop.links.tiktok} target="_blank" rel="noreferrer">TikTok</a>.
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const [ref, cls] = useReveal();
  const current = projects.filter((p) => p.status === 'current');
  const past = projects.filter((p) => p.status !== 'current');

  return (
    <section className="section proj-page" id="top" ref={ref}>
      <div className={`shell ${cls}`}>
        <div className="section-head">
          <div>
            <p className="eyebrow">Projects · Build log</p>
            <h2>
              Past &amp; current
              <br />
              <em>builds</em>
            </h2>
          </div>
          <p className="section-note">
            What's on the lift right now, and what's already back on the road. Every car
            here started the same way: a real diagnosis, then the work.
          </p>
        </div>

        <Group title="Current builds" note="On the lift now" list={current} />
        <Group title="Past builds" note="Back on the road" list={past} />
      </div>
    </section>
  );
}
