/**
 * @file pages/ahooks/useDynamicListSortableDemo.tsx
 * @author leon.wang
 */
import React, { FC, useRef } from 'react';

import { Button, Card, Input, Space, Typography } from '@derbysoft/neat-design';
import { useDynamicList, useMount, useUnmount } from 'ahooks';
import Sortable from 'sortablejs';

const { Paragraph, Text, Title } = Typography;

const initialList = ['Drag this item', 'Use the handle area', 'Keep the order in sync'];

/**
 * Demonstrates synchronizing Sortable.js drag events with useDynamicList.
 */
const UseDynamicListSortableDemo: FC = () => {
  const { list, getKey, move, push, remove, replace, resetList } =
    useDynamicList<string>(initialList);
  const listRef = useRef<HTMLDivElement>(null);
  const sortableRef = useRef<Sortable | null>(null);

  useMount(() => {
    if (!listRef.current) {
      return;
    }

    sortableRef.current = Sortable.create(listRef.current, {
      animation: 150,
      ghostClass: 'sortable-demo__ghost',
      onEnd: ({ oldIndex, newIndex }) => {
        if (oldIndex !== undefined && newIndex !== undefined && oldIndex !== newIndex) {
          move(oldIndex, newIndex);
        }
      },
    });
  });

  useUnmount(() => {
    sortableRef.current?.destroy();
  });

  return (
    <Card>
      <Title level={2}>useDynamicList + Sortable.js</Title>
      <Paragraph>
        Drag any part of a row to reorder it. Sortable.js reports the new indexes and useDynamicList
        keeps the React state synchronized.
      </Paragraph>

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div ref={listRef}>
          {list.map((item, index) => (
            <Space
              key={getKey(index)}
              style={{
                width: '100%',
                padding: '12px 0',
                borderBottom: '1px solid #f0f0f0',
                cursor: 'move',
              }}
            >
              <Text>{index + 1}.</Text>
              <Input
                value={item}
                onChange={(event) => replace(index, event.target.value)}
                aria-label={`Sortable list item ${index + 1}`}
                style={{ flex: 1 }}
              />
              <Button danger onClick={() => remove(index)} disabled={list.length === 1}>
                Remove
              </Button>
            </Space>
          ))}
        </div>

        <Space wrap>
          <Button type="primary" onClick={() => push(`New item ${list.length + 1}`)}>
            Add item
          </Button>
          <Button onClick={() => resetList(initialList)}>Reset</Button>
        </Space>

        <Text code>{JSON.stringify(list)}</Text>
      </Space>
    </Card>
  );
};

export default UseDynamicListSortableDemo;
