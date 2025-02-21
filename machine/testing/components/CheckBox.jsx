"use client"
import React, { useState } from "react";

// Sample data for nested checkboxes
const checkboxData = [
  {
    id: 1,
    label: "Parent 1",
    children: [
      { id: 2, label: "Child 1.1" },
      { id: 3, label: "Child 1.2" },
    ],
  },
  {
    id: 4,
    label: "Parent 2",
    children: [
      { id: 5, label: "Child 2.1" },
      {
        id: 6,
        label: "Child 2.2",
        children: [{ id: 7, label: "Subchild 2.2.1" }],
      },
    ],
  },
];

const CheckboxTree = ({ data, checkedItems, onChange }) => {
  // Handle checkbox state changes
  const handleCheckboxChange = (id, isChecked, children) => {
    onChange(id, isChecked);
    if (children) {
      children.forEach((child) => handleCheckboxChange(child.id, isChecked, child.children));
    }
  };

  return (
    <ul style={{ listStyle: "none", paddingLeft: "20px" }}>
      {data.map((item) => (
        <li key={item.id}>
          <input
            type="checkbox"
            checked={checkedItems[item.id] || false}
            onChange={(e) => handleCheckboxChange(item.id, e.target.checked, item.children)}
          />
          {item.label}
          {item.children && (
            <CheckboxTree data={item.children} checkedItems={checkedItems} onChange={onChange} />
          )}
        </li>
      ))}
    </ul>
  );
};

const NestedCheckbox = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (id, isChecked) => {
    setCheckedItems((prev) => {
      const updatedState = { ...prev, [id]: isChecked };

      // Function to update parents correctly
      const updateParents = (childId) => {
        const parentNode = findParent(checkboxData, childId);
        if (!parentNode) return;

        // Check if ALL children are checked
        const allChildrenChecked = parentNode.children?.every((child) => updatedState[child.id]) || false;

        updatedState[parentNode.id] = allChildrenChecked;

        // If parent is unchecked, also uncheck ancestors
        if (!allChildrenChecked) {
          uncheckAncestors(parentNode.id, updatedState);
        } else {
          updateParents(parentNode.id); // Recursively check higher-level parents
        }
      };

      updateParents(id);
      return updatedState;
    });
  };

  // Function to uncheck ancestors when a child is unchecked
  const uncheckAncestors = (parentId, state) => {
    const parentNode = findParent(checkboxData, parentId);
    if (parentNode) {
      state[parentNode.id] = false;
      uncheckAncestors(parentNode.id, state);
    }
  };

  // Find the parent node of a given child ID
  const findParent = (nodes, childId, parent = null) => {
    for (const node of nodes) {
      if (node.id === childId) return parent;
      if (node.children) {
        const foundParent = findParent(node.children, childId, node);
        if (foundParent) return foundParent;
      }
    }
    return null;
  };

  return (
    <div>
      <h2>Nested Checkbox System</h2>
      <CheckboxTree data={checkboxData} checkedItems={checkedItems} onChange={handleCheckboxChange} />
    </div>
  );
};

export default NestedCheckbox;
