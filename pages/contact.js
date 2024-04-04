import styled from "styled-components";
import Center from "../components/Center";
import Header from "../components/Header";
import Title from "../components/Title";

const Map = styled.iframe`
  height: 200px;
  width: 100%;
  border: 0;
`;

const Contact = () => {
  return (
    <>
      <Header />
      <Center>
        <Title>КОНТАКТ</Title>
        <div>
          <p>
            <b>Телефонски број:</b> 02 317 13 13
          </p>
          <p>
            <b>Е-мејл адреса:</b> bazilika.apteka@gmail.com
          </p>
          <p>
            <b>Локацијa:</b> ул.Јани Лукровски бр.5 лок.10 Б
          </p>
        </div>
        <section>
          <Map
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2964.8896031319937!2d21.462157776488837!3d42.00264475760658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135415ab771af4b1%3A0xb379ff8229128478!2z0JDQv9GC0LXQutCwINCR0LDQt9C40LvQuNC60LAgLyBGYXJtYWN5IEJhemlsaWth!5e0!3m2!1sen!2smk!4v1711453448966!5m2!1sen!2smk"
            width="600"
            height="450"
          ></Map>
        </section>
      </Center>
    </>
  );
};

export default Contact;
