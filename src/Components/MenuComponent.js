import { useEffect } from 'react';

const MenuComponent = () => {
  useEffect(() => {
    const main = document.querySelector('main');
    const menu = document.querySelector('.menu');
    const ul = menu.querySelector('ul');
    const count = ul.childElementCount - 1;
    let idx = 0;

    const handleKeyDown = (e) => {
      const key = e.keyCode;
      const prev = idx;

      if (key === 38 || key === 40) {
        e.preventDefault();

        switch (key) {
          case 38:
            if (idx > 0) {
              idx--;
            }
            break;
          case 40:
            if (idx < count) {
              idx++;
            }
            break;
        }

        ul.children[prev].classList.remove('active');
        ul.children[idx].classList.add('active');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); 

  return (
    <main className="scanlines">
      <div className="screen">
        <canvas id="canvas" className="picture"></canvas>
        <div className="overlay">
          <div className="text">
            <span>AV-1</span>
          </div>
          <div className="menu">
            <header>Main Menu</header>
            <ul>
              <li className="active">
                <a href="#" title="">
                  TETRIS
                </a>
              </li>
              <li>
                <a href="#" title="">
                  Sound
                </a>
              </li>
              <li>
                <a href="#" title="">
                  About
                </a>
              </li>
              <li>
                <a href="#" title="">
                  Contact
                </a>
              </li>
            </ul>
            <footer>
              <div className="key">
                Exit: <span>1</span>
              </div>
              <div className="key">
                Select: <span>2</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MenuComponent;
