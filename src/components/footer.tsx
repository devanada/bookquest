const Footer = () => {
  return (
    <footer className="w-full min-h-[20vh] bg-white">
      <div className="flex items-center container p-6 h-full">
        <p>{new Date().getFullYear()} BookQuest. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
