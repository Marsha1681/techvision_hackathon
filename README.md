# Slingshot Shopping: The "Bad UI" Experience

A physics-based shopping interface where grabbing your items is easy, but getting them into the cart is a challenge of gravity and skill.

---

## How It Works

### 1. Drag Interaction
* Users drag a shopping item from under the "browse items" header to slingshot it to the right side.
* If released with the correct angle and distance, the item can fall into the cart area. Otherwise, it will either miss or enter a vacuum.
* When releasing the item, a whoosh sound effect plays.
* The trajectory of the item is determined by the angle and distance that the item is pulled back at. The further is is pulled back, 
the further it will travel.

### 2. Cart Collision
*  Items must land through the top opening of the cart to count.
*  Once inside, items stack with random rotations to simulate a messy shopping pile.
* **Feedback:** A successful hit triggers a `pop` sound, shows a popup displaying the item price, and updates the total price badge.

### 3. Vacuum Collision
* **The Obstacles:** Beware of the floating black Vacuum Holes!
* If a shopping item touches a vacuum, it instantly shrinks and is sucked into the void.
* The items getting sucked in are accompanied by a `suction` sound effect.

### 4. Miss Logic
* If the item misses the cart and falls off the screen, a **"MISS"** popup appears to let you know you need to do better!
* When you have successfully put 8 shopping items into the cart, a red message pops up saying cart is full.

---

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Marsha1681/techvision_hackathon.git

2. **Navigate into the project folder**
   ```bash
   cd techvision_hackathon
   
3. **Install dependencies**
   ```bash
   npm install
   
4. Start the Server
   ```bash
   npm run dev
   
