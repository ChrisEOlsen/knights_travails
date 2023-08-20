Knight's Travails: A Chessboard Shortest Path Finder

Overview
This project finds the shortest path for a knight on a chessboard between two chosen points. The user first selects a starting position and then an end position. Upon clicking the "FIND PATH" button, the shortest path is calculated and displayed on the board, showing the knight's moves as numbered steps.

How to Use
Load the project in your browser.
Click on any cell in the chessboard to choose the starting position.
Click on another cell to choose the end position.
Press the "FIND PATH" button to visualize the shortest path between the chosen points.
If you wish to start over or choose different points, click the "RESET" button.

Features
Interactive Chessboard: A 8x8 grid allows users to select start and end points.
Breadth-First Search: Utilizes BFS to compute the shortest path for the knight.
Responsive UI: Clear instructions guide the user through the process.

Code Structure
draw: Responsible for rendering the chessboard grid.
knightsTravails: Contains the logic for calculating the knight's shortest path using BFS and an adjacency list to model the chessboard.
events: Manages user interactions and updates the UI accordingly.

Requirements
A modern web browser (e.g., Chrome, Firefox).
No additional dependencies required.
Customization
Board Size: Currently, the chessboard is hardcoded to an 8x8 grid, but you can adjust the logic if you wish to experiment with different board sizes.
Styling: The board's appearance can be customized via the associated CSS file.

Known Issues
None at the moment. Please report any bugs you find.

Future Improvements
Alternate Pieces: Extend the project to support paths for other chess pieces.
Multiple Knights: Support for finding paths with multiple knights simultaneously.

License
This project is open source and available under the MIT License.
