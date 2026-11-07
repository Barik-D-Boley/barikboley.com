import Panel from '../ui/Panel';
import SectionHeader from '../ui/SectionHeader';

export default function AboutSection({ number = "001" }: { number?: string }) {
  return (
    <Panel className="about-panel" id="about">
      <SectionHeader eyebrow={`Profile / ${number}`} title="ABOUT ME" />
      <p className="intro">
        I’m a mechanical engineering student and software developer who
        enjoys building systems that move seamlessly between real-world
        constraints and clean digital logic.
      </p>
      <p>
        As an Eagle Scout, I learned to lead with preparation, service,
        and accountability. I’m bilingual in English and Spanish,
        bringing clear communication to every team and technical
        challenge.
      </p>
      <dl className="profile-facts">
        <div>
          <dt>Location</dt>
          <dd>Rexburg, Idaho</dd>
        </div>
        <div>
          <dt>Languages</dt>
          <dd>English / Spanish</dd>
        </div>
        <div>
          <dt>Focus</dt>
          <dd>Design + Automation</dd>
        </div>
      </dl>
    </Panel>
  )
}