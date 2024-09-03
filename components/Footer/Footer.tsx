import FooterItem from './FooterItem';

export default function Footer() {
  return (
    <footer className="footer mx-auto">
      <FooterItem
        name="Ten Artur"
        ghLink="https://github.com/qoolebyaqa"
        dsLink="https://discord.com/users/539409262355546122"
        location='Tashkent, Uzbekistan'
      />
      <FooterItem
        name="Petr Markin"
        ghLink="https://github.com/PetrMarkin"
        dsLink="https://discordapp.com/users/557296404104478743"
        location='Sochi, Russia'
      />
      <FooterItem
        name="Dmitry Martynovich"
        ghLink="https://github.com/dm-mrtnvch"
        dsLink="https://discord.com/users/819282393499566081"
        location='Batumi, Georgia'
      />
      <div className="flex justify-start mt-2">
        <p>©2024 The Rolling Scopes</p>
      </div>
    </footer>
  );
}
