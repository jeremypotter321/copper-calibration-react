import { bays } from '../data/shop';
import { useReveal } from '../hooks/useReveal';

export default function Bays() {
  const [ref, cls] = useReveal();

  return (
    <section className="section" id="bays" ref={ref}>
      <div className={`shell ${cls}`}>
        <div className="section-head">
          <div>
            <p className="eyebrow">03 · What rolls in</p>
            <h2>
              Four bays,
              <br />
              <em>one lift</em>
            </h2>
          </div>
          <p className="section-note">
            Maintenance that keeps the car alive, and modifications that make it worth
            driving. Same lift, same laptop, same person doing both.
          </p>
        </div>

        <div className="bay-grid">
          {bays.map((bay) => (
            <article className="bay" key={bay.no}>
              <span className="bay-no">{bay.no}</span>
              <h3>{bay.title}</h3>
              <span className="bay-tag">{bay.tag}</span>
              <ul>
                {bay.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
