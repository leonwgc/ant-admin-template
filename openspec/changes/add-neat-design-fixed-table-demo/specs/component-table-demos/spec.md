# Spec Delta

## Purpose

Component table demos provide discoverable examples for building table-based admin interfaces in the Components menu, with behavior that can be verified through navigation and scrolling.

## ADDED Requirements

### Requirement: Fixed table demo is available from the Components menu
The system SHALL provide a localized Components menu entry that opens a demo page for fixed table header and fixed columns.

#### Scenario: User opens the fixed table demo
- **WHEN** a signed-in user selects the fixed table demo entry from the Components menu
- **THEN** the application displays the fixed table demo page

### Requirement: Fixed table demo demonstrates vertical and horizontal scrolling
The fixed table demo page SHALL present enough tabular content to demonstrate vertical scrolling, horizontal scrolling, a header that remains visible during vertical scrolling, fixed columns on the left, and a fixed action column on the right.

#### Scenario: User scrolls the table vertically
- **WHEN** the user scrolls the demo table vertically
- **THEN** the table header remains visible while body rows move underneath it

#### Scenario: User scrolls the table horizontally
- **WHEN** the user scrolls the demo table horizontally
- **THEN** the configured left fixed columns and right fixed action column remain visible while middle columns move horizontally

### Requirement: Fixed table demo content is self-contained
The fixed table demo SHALL use local demonstration data and SHALL NOT require backend services to load the page or exercise the fixed header and fixed column behavior.

#### Scenario: User opens the demo without API data
- **WHEN** the fixed table demo page loads
- **THEN** the page renders demonstration rows without making feature-specific backend data a prerequisite
