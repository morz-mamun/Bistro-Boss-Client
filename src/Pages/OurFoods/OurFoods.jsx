import  { useState } from "react";
import useMenu from "../../Hooks/useMenu";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Cover from "../Shared/Cover/Cover";
import coverImg from '../../assets/shop/banner2.jpg'
import OrderTab from "./OrderTab/OrderTab";
import { useParams } from "react-router-dom";

const OurFoods = () => {
  // data load by useMenu hook
  const [menus] = useMenu();
  const categories = ['salads', 'pizzas', 'soups', 'desserts', 'drinks']
  const {category} = useParams()
  const initialIndex = categories.indexOf(category)
 
  const [tabIndex, setTabIndex] = useState(initialIndex)
  const drinksMenu = menus.filter((menu) => menu.category === "drinks");
  const dessertMenu = menus.filter((menu) => menu.category === "dessert");
  const pizzaMenu = menus.filter((menu) => menu.category === "pizza");
  const saladMenu = menus.filter((menu) => menu.category === "salad");
  const soupMenu = menus.filter((menu) => menu.category === "soup");

  return (
    <div className="">
      <Cover img={coverImg} title={'Our Foods'} description={'Would you like to try a dish?'}></Cover>
      <Tabs className='my-20' defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salads</Tab>
          <Tab>Pizzas</Tab>
          <Tab>Soups</Tab>
          <Tab>Desserts</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
            <OrderTab items={saladMenu}></OrderTab>
        </TabPanel>
        <TabPanel>
            <OrderTab items={pizzaMenu}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={soupMenu}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={dessertMenu}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={drinksMenu}></OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default OurFoods;
