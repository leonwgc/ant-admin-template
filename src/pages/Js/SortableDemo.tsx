/**
 * @file src/pages/Js/SortableDemo.tsx
 * @author leon.wang
 */

import React, { useRef, useEffect, useState } from 'react';
import Sortable from 'sortablejs';
import { Card, Typography, Space, Button, Tag } from '@derbysoft/neat-design';
import './SortableDemo.scss';
import { useLatest } from 'ahooks';

const { Title, Paragraph, Text } = Typography;

interface Item {
  id: number;
  name: string;
  color?: string;
}

const SortableDemo: React.FC = () => {
  // Basic Sortable List
  const [basicList, setBasicList] = useState<Item[]>([
    { id: 1, name: 'Item 1', color: 'blue' },
    { id: 2, name: 'Item 2', color: 'green' },
    { id: 3, name: 'Item 3', color: 'red' },
    { id: 4, name: 'Item 4', color: 'orange' },
    { id: 5, name: 'Item 5', color: 'purple' },
  ]);

  const basicListLRef = useLatest(basicList);

  // Multiple Lists
  const [listA, setListA] = useState<Item[]>([
    { id: 11, name: 'Task A1' },
    { id: 12, name: 'Task A2' },
    { id: 13, name: 'Task A3' },
  ]);

  const [listB, setListB] = useState<Item[]>([
    { id: 21, name: 'Task B1' },
    { id: 22, name: 'Task B2' },
    { id: 23, name: 'Task B3' },
  ]);

  // Handle Drag
  const [handleList, setHandleList] = useState<Item[]>([
    { id: 31, name: 'Drag me by handle', color: 'cyan' },
    { id: 32, name: 'Drag me by handle', color: 'magenta' },
    { id: 33, name: 'Drag me by handle', color: 'gold' },
  ]);

  // Clone List
  const [sourceList] = useState<Item[]>([
    { id: 41, name: 'Clone Item 1' },
    { id: 42, name: 'Clone Item 2' },
    { id: 43, name: 'Clone Item 3' },
  ]);

  const [targetList, setTargetList] = useState<Item[]>([]);

  // Refs
  const basicRef = useRef<HTMLDivElement>(null);
  const listARef = useRef<HTMLDivElement>(null);
  const listBRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  // Basic Sortable
  useEffect(() => {
    if (basicRef.current) {
      const intance = Sortable.create(basicRef.current, {
        animation: 150,
        ghostClass: 'sortable-demo__ghost',
        dataIdAttr: 'data-id',
        onEnd: function () {
          // 序列化可排序的列表单元的data-id（可通过配置项中dataIdAttr修改）放入一个数组，并返回这个数组中
          const ar = intance.toArray();
          const newList = basicListLRef.current.sort(
            (a, b) => ar.indexOf(String(a.id)) - ar.indexOf(String(b.id))
          );
          setBasicList(newList);
        },
      });
    }
  }, [basicListLRef]);

  // Multiple Lists with shared group
  useEffect(() => {
    if (listARef.current && listBRef.current) {
      Sortable.create(listARef.current, {
        group: 'shared',
        animation: 150,
        ghostClass: 'sortable-demo__ghost',
        onEnd: () => {
          //   updateMultipleLists();
        },
      });

      Sortable.create(listBRef.current, {
        group: 'shared',
        animation: 150,
        ghostClass: 'sortable-demo__ghost',
        onEnd: () => {
          //   updateMultipleLists();
        },
      });
    }
  }, []);

  const updateMultipleLists = () => {
    if (listARef.current && listBRef.current) {
      const newListA: Item[] = [];
      const newListB: Item[] = [];

      Array.from(listARef.current.children).forEach((child) => {
        const id = parseInt(child.getAttribute('data-id') || '0');
        const name = child.textContent || '';
        newListA.push({ id, name });
      });

      Array.from(listBRef.current.children).forEach((child) => {
        const id = parseInt(child.getAttribute('data-id') || '0');
        const name = child.textContent || '';
        newListB.push({ id, name });
      });

      setListA(newListA);
      setListB(newListB);
    }
  };

  // Handle Drag
  useEffect(() => {
    if (handleRef.current) {
      Sortable.create(handleRef.current, {
        handle: '.sortable-demo__handle',
        animation: 150,
        ghostClass: 'sortable-demo__ghost',
        onEnd: (evt) => {
          setHandleList((prev) => {
            const newList = [...prev];
            const [movedItem] = newList.splice(evt.oldIndex!, 1);
            newList.splice(evt.newIndex!, 0, movedItem);
            return newList;
          });
        },
      });
    }
  }, []);

  // Clone Mode
  useEffect(() => {
    if (sourceRef.current && targetRef.current) {
      Sortable.create(sourceRef.current, {
        group: {
          name: 'clone',
          pull: 'clone',
          put: false,
        },
        animation: 150,
        sort: false,
      });

      Sortable.create(targetRef.current, {
        group: 'clone',
        animation: 150,
        ghostClass: 'sortable-demo__ghost',
        onAdd: (evt) => {
          const name = evt.item.textContent || '';
          const newItem = { id: Date.now(), name };
          setTargetList((prev) => {
            const newList = [...prev];
            newList.splice(evt.newIndex!, 0, newItem);
            return newList;
          });
          evt.item.remove();
        },
        onUpdate: (evt) => {
          setTargetList((prev) => {
            const newList = [...prev];
            const [movedItem] = newList.splice(evt.oldIndex!, 1);
            newList.splice(evt.newIndex!, 0, movedItem);
            return newList;
          });
        },
      });
    }
  }, [targetList]);

  const resetBasicList = () => {
    setBasicList([
      { id: 1, name: 'Item 1', color: 'blue' },
      { id: 2, name: 'Item 2', color: 'green' },
      { id: 3, name: 'Item 3', color: 'red' },
      { id: 4, name: 'Item 4', color: 'orange' },
      { id: 5, name: 'Item 5', color: 'purple' },
    ]);
  };

  const clearTargetList = () => {
    setTargetList([]);
  };

  return (
    <div className="sortable-demo">
      <Title level={2}>Sortable.js - Drag & Drop Library</Title>
      <Paragraph>
        Sortable is a JavaScript library for reorderable drag-and-drop lists.
      </Paragraph>

      {/* Basic Sortable */}
      <Card title="1. Basic Drag & Drop" className="sortable-demo__card">
        <Paragraph>
          <Text strong>Features:</Text> Simple drag and drop reordering
        </Paragraph>
        <div className="sortable-demo__list" ref={basicRef}>
          {basicList.map((item) => (
            <div
              key={item.id}
              className="sortable-demo__item"
              data-id={item.id}
            >
              <Tag>{item.name}</Tag>
            </div>
          ))}
        </div>
        <Button onClick={resetBasicList} style={{ marginTop: 16 }}>
          Reset Order
        </Button>
        <Paragraph style={{ marginTop: 16 }}>
          <Text code>
            {`Sortable.create(element, {
  animation: 150,
  onEnd: (evt) => {
    // Update state based on new order
  }
});`}
          </Text>
        </Paragraph>
      </Card>

      {/* Multiple Lists */}
      <Card
        title="2. Multiple Lists with Shared Group"
        className="sortable-demo__card"
      >
        <Paragraph>
          <Text strong>Features:</Text> Drag items between multiple lists
        </Paragraph>
        <div className="sortable-demo__multiple">
          <div className="sortable-demo__column">
            <Text strong>List A ({listA.length})</Text>
            <div className="sortable-demo__list" ref={listARef}>
              {listA.map((item) => (
                <div
                  key={item.id}
                  className="sortable-demo__item"
                  data-id={item.id}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
          <div className="sortable-demo__column">
            <Text strong>List B ({listB.length})</Text>
            <div className="sortable-demo__list" ref={listBRef}>
              {listB.map((item) => (
                <div
                  key={item.id}
                  className="sortable-demo__item"
                  data-id={item.id}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Paragraph style={{ marginTop: 16 }}>
          <Text code>
            {`Sortable.create(element, {
  group: 'shared',
  animation: 150,
  onEnd: () => {
    // Sync state with DOM
  }
});`}
          </Text>
        </Paragraph>
      </Card>

      {/* Handle Drag */}
      <Card title="3. Drag Handle" className="sortable-demo__card">
        <Paragraph>
          <Text strong>Features:</Text> Drag only by specific handle element
        </Paragraph>
        <div className="sortable-demo__list" ref={handleRef}>
          {handleList.map((item) => (
            <div
              key={item.id}
              className="sortable-demo__item-with-handle"
              data-id={item.id}
            >
              <span className="sortable-demo__handle">☰</span>
              <Tag>{item.name}</Tag>
            </div>
          ))}
        </div>
        <Paragraph style={{ marginTop: 16 }}>
          <Text code>
            {`Sortable.create(element, {
  handle: '.handle-class',
  animation: 150
});`}
          </Text>
        </Paragraph>
      </Card>

      {/* Clone Mode */}
      <Card title="4. Clone Mode" className="sortable-demo__card">
        <Paragraph>
          <Text strong>Features:</Text> Clone items from source to target list
        </Paragraph>
        <div className="sortable-demo__multiple">
          <div className="sortable-demo__column">
            <Text strong>Source (Clone from here)</Text>
            <div
              className="sortable-demo__list sortable-demo__source"
              ref={sourceRef}
            >
              {sourceList.map((item) => (
                <div
                  key={item.id}
                  className="sortable-demo__item"
                  data-id={item.id}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
          <div className="sortable-demo__column">
            <Space>
              <Text strong>Target ({targetList.length})</Text>
              <Button size="small" onClick={clearTargetList}>
                Clear
              </Button>
            </Space>
            <div
              className="sortable-demo__list sortable-demo__target"
              ref={targetRef}
            >
              {targetList.map((item) => (
                <div
                  key={item.id}
                  className="sortable-demo__item"
                  data-id={item.id}
                >
                  {item.name}
                </div>
              ))}
              {targetList.length === 0 && (
                <div className="sortable-demo__empty">Drop items here</div>
              )}
            </div>
          </div>
        </div>
        <Paragraph style={{ marginTop: 16 }}>
          <Text code>
            {`// Source: Clone only
Sortable.create(source, {
  group: {
    name: 'clone',
    pull: 'clone',
    put: false
  },
  sort: false
});

// Target: Accept clones
Sortable.create(target, {
  group: 'clone',
  onAdd: (evt) => {
    // Handle cloned item
  }
});`}
          </Text>
        </Paragraph>
      </Card>

      {/* Advanced Features */}
      <Card title="Advanced Features & Options" className="sortable-demo__card">
        <Title level={5}>Common Options:</Title>
        <ul>
          <li>
            <Text code>animation</Text> - Animation speed in milliseconds
          </li>
          <li>
            <Text code>handle</Text> - Drag handle selector
          </li>
          <li>
            <Text code>group</Text> - Group items between lists
          </li>
          <li>
            <Text code>ghostClass</Text> - Class for dragged element
          </li>
          <li>
            <Text code>chosenClass</Text> - Class for selected element
          </li>
          <li>
            <Text code>dragClass</Text> - Class while dragging
          </li>
          <li>
            <Text code>disabled</Text> - Disable sorting
          </li>
          <li>
            <Text code>filter</Text> - Elements to exclude from dragging
          </li>
          <li>
            <Text code>delay</Text> - Time in ms before dragging starts
          </li>
          <li>
            <Text code>delayOnTouchOnly</Text> - Only delay on touch devices
          </li>
        </ul>

        <Title level={5} style={{ marginTop: 16 }}>
          Events:
        </Title>
        <ul>
          <li>
            <Text code>onStart</Text> - Dragging started
          </li>
          <li>
            <Text code>onEnd</Text> - Dragging ended
          </li>
          <li>
            <Text code>onAdd</Text> - Element added to list
          </li>
          <li>
            <Text code>onUpdate</Text> - Element order changed
          </li>
          <li>
            <Text code>onRemove</Text> - Element removed from list
          </li>
          <li>
            <Text code>onSort</Text> - Any change to the list
          </li>
          <li>
            <Text code>onMove</Text> - Called when moving an element
          </li>
          <li>
            <Text code>onClone</Text> - Called when cloning an element
          </li>
        </ul>

        <Title level={5} style={{ marginTop: 16 }}>
          Group Options:
        </Title>
        <Paragraph>
          <Text code>
            {`group: {
  name: 'shared',      // Group name
  pull: true,          // Allow dragging out
  put: true,           // Allow dropping in
  revertClone: false   // Revert cloned element
}

// Pull/Put options:
pull: true         // Allow all
pull: false        // Deny all
pull: 'clone'      // Clone instead of move
put: ['group1']    // Accept from specific groups`}
          </Text>
        </Paragraph>
      </Card>

      {/* React Integration Tips */}
      <Card
        title="React Integration Best Practices"
        className="sortable-demo__card"
      >
        <Title level={5}>1. Use useEffect for initialization:</Title>
        <Paragraph>
          <Text code>
            {`useEffect(() => {
  const sortable = Sortable.create(elementRef.current, options);
  return () => sortable.destroy(); // Cleanup
}, [dependencies]);`}
          </Text>
        </Paragraph>

        <Title level={5}>2. Sync state with DOM:</Title>
        <Paragraph>
          <Text code>
            {`onEnd: (evt) => {
  const newList = [...items];
  const [moved] = newList.splice(evt.oldIndex, 1);
  newList.splice(evt.newIndex, 0, moved);
  setItems(newList);
}`}
          </Text>
        </Paragraph>

        <Title level={5}>3. Use data attributes for identification:</Title>
        <Paragraph>
          <Text code>
            {`<div data-id={item.id}>{item.name}</div>

// In event handler:
const id = evt.item.getAttribute('data-id');`}
          </Text>
        </Paragraph>

        <Title level={5}>4. Prevent re-initialization:</Title>
        <Paragraph>
          <Text code>
            {`const sortableRef = useRef(null);

useEffect(() => {
  if (!sortableRef.current) {
    sortableRef.current = Sortable.create(element, options);
  }
}, []); // Empty deps - init once`}
          </Text>
        </Paragraph>
      </Card>
    </div>
  );
};

export default SortableDemo;
