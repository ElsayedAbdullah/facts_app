const Header = (props) => {
  return (
    <header className='header'>
      <div className='logo'>
        <img src='logo.png' height='68' width='68' alt='Today I Learned Logo' />
        <h1>Today I Learned</h1>
      </div>

      <button onClick={() => props.setIsShowForm((show) => !show)} className='btn btn-large btn-share-fact'>
        {props.showForm ? 'Close' : 'Share a Fact'}
      </button>
    </header>
  );
};

export default Header;
