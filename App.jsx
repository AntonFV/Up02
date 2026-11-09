import './App.css'
import { BrowserRouter, Link, Routes, Route, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { useState, useReducer } from 'react';
import { createContext, useContext } from 'react'; 

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {}
});
const CartContext = createContext({
  cart: [],
  dispatch: () => {}
});

export function Login(){
  const navigate = useNavigate();


  function handleLogin(){
    const isAuth = true;

    if(isAuth){
      navigate("/menu");
    }
    else{
      alert("Ошибка авторизации");
    }
  }

  return (
    <div style={{textAlign: "center", marginTop: "50px"}}>
      <h2>Страница входа</h2>
      <button onClick={handleLogin}>Войти</button>
    </div>

  );
}


function Menu() {
const { theme, toggleTheme } = useContext(ThemeContext); 
const navigate = useNavigate();

  const menuBtnStyle = {
    padding: "15px 30px",
    fontSize: "18px",
    backgroundColor: theme === "dark" ? "#444" : "#f4f3ec",
    color: theme === "dark" ? "#fff" : "#000",
    border: "2px solid #2e339b",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.3s"
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ fontFamily: "Ink Free", fontSize: "48px", color: theme === "dark" ? "#fff" : "#000" }}>
        Главное Меню
      </h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
        <button style={menuBtnStyle} onClick={() => navigate("/catalog")}>
          Перейти в каталог
        </button>
        <button style={menuBtnStyle} onClick={() => navigate("/catalog")}>
          Корзина
        </button>
        <button style={menuBtnStyle} onClick={() => navigate("/about")}>
          О нас
        </button>
        <button onClick={toggleTheme} style={menuBtnStyle}>
          Сменить тему на {theme === "light" ? "тёмную" : "светлую"}
        </button>
      </div>
    </div>
  );
}

function About() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div style={{ textAlign: "center", marginTop: "50px", color: theme === "dark" ? "#fff" : "#000" }}>
      <h2>О нас</h2>
      <p>Здесь скоро появится информация о наc.</p>
    </div>
  );
}

function Sale(props) {
  const { theme } = useContext(ThemeContext); 
  const { dispatch } = useContext(CartContext);
  const [count, setCount] = useState(0);  

  const handleClick = () => {
    setCount((c) => c + 1); 
    dispatch({ type: "add", payload: { name: props.name, cost: props.cost } }); 
  };


  const cardStyles = {
    backgroundColor: theme === "dark" ? "#2a2d3e" : "#f4f3ec",
    borderColor: theme === "dark" ? "#3bffba" : "#2e339b",
    color: theme === "dark" ? "#fff" : "#000",
    transition: "0.3s"
  };

  return (
    <div className="item1" style={cardStyles}>
      <h1 style={{ color: theme === "dark" ? "#fff" : "#08060d" }}>{props.name}</h1>
{props.image && (
        <img 
          src={props.image} 
          style={{ maxWidth: "100%", maxHeight: "120px", objectFit: "contain", marginBottom: "10px", borderRadius: "8px" }} 
        />
      )}      <b className="title1" style={{ color: theme === "dark" ? "#c084fc" : "#3a4269" }}>
        Цена: {props.cost}
      </b>
      
      <button 
        className="SaleButton" 
        onClick={handleClick}
        style={{
          backgroundColor: theme === "dark" ? "#444" : "antiquewhite",
          color: theme === "dark" ? "#fff" : "#000",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Добавить в корзину
      </button>
    
    </div>
  );
}
const initialCart = [];

function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      const existingItem = state.find(item => item.name === action.payload.name);
      
      if (existingItem) {
        return state.map(item =>
          item.name === action.payload.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      
      return [...state, { ...action.payload, quantity: 1 }];
      
    case "decrease":
      
      return state.map(item => {
        if (item.name === action.payload.name) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter(item => item.quantity > 0);
      
    case "remove":
      return state.filter(item => item.name !== action.payload.name);
      
    case "clear":
      return [];
      
    default:
      return state;
  }
}

function Home() {
  const { theme } = useContext(ThemeContext); 
  const { cart, dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const products = [
    { name: "Хлеб", cost: "65", image:"https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" },
    { name: "Молоко", cost: "90", image:"https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" },
    { name: "Чай", cost: "400", image:"https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" },
    { name: "Колбаса", cost: "150", image:"https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" },
    { name: "Масло", cost: "120", image:"https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" },
    { name: "Творог", cost: "140", image:"https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" },
  ];
 const addAndGoToCart = (product) => {
    dispatch({ type: "add", payload: product }); 
    navigate("/cart");        
  };

  return (
    <div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.name} onClick={() => navigate("/cart")}>
            <Sale 
              name={product.name} 
              cost={product.cost} 
              image={product.image}
            />
          </div>
        ))}
      </div>
      <h3 style={{ color: theme === "dark" ? "#fff" : "#08060d", textAlign: "center" }}>
        Выбрано товаров: {cart.length}
      </h3>
    </div>
  );
}

function Cart() {
  const { theme } = useContext(ThemeContext); 
  const { cart, dispatch } = useContext(CartContext);
  
  const total = cart.reduce((sum, item) => sum + (Number(item.cost) * item.quantity), 0);  

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: theme === "dark" ? "#fff" : "#08060d" }}>Корзина</h2>
      
      {cart.length === 0 ? (
        <p style={{ color: theme === "dark" ? "#ccc" : "#666" }}>Корзина пуста</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {cart.map((item, index) => (
            <li key={index} style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #ccc",
              color: theme === "dark" ? "#fff" : "#000"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <span style={{ fontWeight: "bold", minWidth: "120px" }}>{item.name}</span>
                <span>Цена: {item.cost} руб.</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button 
                  onClick={() => dispatch({ type: "decrease", payload: item })}
                  style={{ padding: "2px 8px", cursor: "pointer", fontSize: "16px" }}
                >
                  -
                </button>
                
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>{item.quantity}</span>
                
                <button 
                  onClick={() => dispatch({ type: "add", payload: item })}
                  style={{ padding: "2px 8px", cursor: "pointer", fontSize: "16px" }}
                >
                  +
                </button>

                <span style={{ minWidth: "80px", textAlign: "right", marginLeft: "10px" }}>
                  {Number(item.cost) * item.quantity} руб.
                </span>

                <button 
                  onClick={() => dispatch({ type: "remove", payload: item })}
                  style={{
                    backgroundColor: "#ff0033",
                    color: "#fff",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginLeft: "10px"
                  }}
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {cart.length > 0 && (
        <div style={{ marginTop: "20px", color: theme === "dark" ? "#fff" : "#000", textAlign: "right" }}>
          <h3>Итого: {total} руб.</h3>
          <button 
            onClick={() => dispatch({ type: "clear" })}
            style={{ backgroundColor: "#ff5555", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }}
          >
            Очистить корзину
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  
const [theme, setTheme] = useState(() => {
    return localStorage.getItem("app-theme") || "light";
  });

const [cart, dispatch] = useReducer(cartReducer, [], () => {
  const savedCart = localStorage.getItem("app-cart");
  return savedCart ? JSON.parse(savedCart) : [];
});
const customDispatch = (action) => {
    dispatch(action);
    const newCart = cartReducer(cart, action);
    localStorage.setItem("app-cart", JSON.stringify(newCart));

  };
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);

  localStorage.setItem("app-theme", newTheme);
  };

  

  const appStyles = {
    backgroundColor: theme === "dark" ? "#333" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
    minHeight: "100vh",
    padding: "20px",
    transition: "0.3s",
    boxSizing: "border-box" 
  };

  const navButtonStyle = ({ isActive }) => ({
    backgroundColor: isActive 
      ? (theme === "light" ? "#ff0033" : "#ff5555") 
      : (theme === "light" ? "#2e339b" : "#c084fc"),
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "5px",
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none",
    display: "inline-block",
    transition: "0.3s"
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <CartContext.Provider value={{ cart, dispatch:customDispatch }}>
        <div style={appStyles}>
          <BrowserRouter>
            <nav style={{ margin: "10px", display: "flex", alignItems: "center", gap: "15px" }}>
              <NavLink to="/catalog" style={navButtonStyle}>Каталог товаров</NavLink>
              
              <NavLink to="/cart" style={navButtonStyle}>
                Корзина ({cart.length})
              </NavLink>

              <NavLink to="/Menu" style={navButtonStyle}>
                Меню
              </NavLink>
              
              <button onClick={toggleTheme} style={{ ...navButtonStyle({ isActive: false }), marginLeft: "auto", cursor: "pointer" }}>
                Сменить тему на {theme === "light" ? "тёмную" : "светлую"}
              </button>
            </nav>

            <Routes>
  <Route path="/" element={<Login />} />
  
  <Route path="/menu" element={<Menu />} />
  <Route path="/about" element={<About />} />
  
  <Route path="/catalog" element={<Home />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="*" element={<Navigate to="/" />} />
</Routes>
          </BrowserRouter>
        </div>
      </CartContext.Provider>
    </ThemeContext.Provider>
  );
}


export default App;
