import Panel from '../ui/Panel';
import SectionHeader from '../ui/SectionHeader';

export default function AboutSection({ number = "001" }: { number?: string }) {
  return (
    <Panel className="about-panel" id="about">
      <SectionHeader eyebrow={`Profile / ${number}`} title="ABOUT ME" />
      <p className="intro">
        I’m a mechanical engineering student at BYU–Idaho working toward{" "}
        <strong className="about-highlight">a career in nuclear engineering</strong>,
        with plans to pursue a master’s in nuclear engineering. My independent
        projects model high-temperature gas-cooled reactor components, taking
        designs from CAD through meshing and multiphysics simulation.
      </p>
      <p>
        Outside of engineering, software development is my hobby. I build
        small tools that automate everyday tasks, and a few are featured
        above. I’m bilingual in English and Spanish, and as an Eagle Scout I
        learned to lead with preparation and accountability.
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
          <dd>Nuclear Engineering</dd>
        </div>
      </dl>
    </Panel>
  )
}