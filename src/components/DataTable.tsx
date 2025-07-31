import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

interface Item {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string | null;
  date_start: number;
  date_end: number;
}

interface ApiData {
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string | null;
  };
  data: Item[];
}

const TableComponent = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(12);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [selectRows, setSelectRows] = useState<string>('');
  const op = useRef<OverlayPanel>(null);

  const getData = async (page: number, pageSize: number = rows) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=${pageSize}`);
      const result: ApiData = await response.json();
      
      // Mark items as selected based on persistent selection
      const itemsWithSelection = result.data.map(item => ({
        ...item,
        selected: selectedIds.has(item.id)
      }));
      
      setItems(itemsWithSelection);
      setTotalRecords(result.pagination.total);
      setFirst((page - 1) * pageSize);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectionChange = (e: any) => {
    const selected = e.value as Item[];
    const newSelectedIds = new Set(selectedIds);
    
    // Update selection state
    items.forEach(item => {
      if (selected.find(s => s.id === item.id)) {
        newSelectedIds.add(item.id);
      } else {
        newSelectedIds.delete(item.id);
      }
    });
    
    setSelectedIds(newSelectedIds);
  };

  const handleSelectRows = async () => {
    if (!selectRows.trim()) return;
    
    const inputNumbers = selectRows.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    const newSelectedIds = new Set(selectedIds);
    
    for (const inputNum of inputNumbers) {
      if (inputNum > 0) {
        // Select all rows from 1 to inputNum
        for (let rowNum = 1; rowNum <= inputNum; rowNum++) {
          // Calculate which page and position within that page
          const pageNumber = Math.ceil(rowNum / rows);
          const positionInPage = ((rowNum - 1) % rows) + 1;
          
          // If it's current page, select directly
          if (pageNumber === Math.floor(first / rows) + 1) {
            if (positionInPage <= items.length) {
              const item = items[positionInPage - 1];
              newSelectedIds.add(item.id);
            }
          } else {
            // Fetch data from the target page to get the item ID
            try {
              const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${pageNumber}&limit=${rows}`);
              const result: ApiData = await response.json();
              
              if (positionInPage <= result.data.length) {
                const item = result.data[positionInPage - 1];
                newSelectedIds.add(item.id);
              }
            } catch (error) {
              console.log('Error fetching data for row selection:', error);
            }
          }
        }
      }
    }
    
    setSelectedIds(newSelectedIds);
    setSelectRows('');
    op.current?.hide();
  };

  useEffect(() => {
    getData(1, 12);
  }, []);

  const handlePageChange = (event: any) => {
    const newPage = event.page + 1;
    const newRows = event.rows;
    setFirst(event.first);
    setRows(newRows);
    getData(newPage, newRows);
  };

  // Get currently selected items for this page
  const currentPageSelected = items.filter(item => selectedIds.has(item.id));

  return (
    <div className="table-container">
      <div className="mb-3 flex align-items-center gap-2">
        <Button 
          icon="pi pi-chevron-down" 
          label="Select Rows" 
          onClick={(e) => op.current?.toggle(e)}
          className="p-button-outlined p-button-secondary"
          style={{ backgroundColor: 'white', color: '#495057' }}
        />
        <OverlayPanel ref={op}>
          <div className="p-3">
            <label htmlFor="selectRows" className="block mb-2">Select rows 1 to N (e.g., 20 = rows 1-20):</label>
            <InputText
              id="selectRows"
              value={selectRows}
              onChange={(e) => setSelectRows(e.target.value)}
              placeholder="Enter number (e.g., 20)..."
              className="mb-2 w-full"
            />
            <Button 
              label="Submit" 
              onClick={handleSelectRows}
              className="w-full"
            />
          </div>
        </OverlayPanel>
        <span className="text-sm">
          Selected: {selectedIds.size} items
        </span>
      </div>
      
      <DataTable 
        value={items} 
        paginator 
        rows={rows} 
        first={first}
        totalRecords={totalRecords}
        lazy={true}
        loading={loading}
        onPage={handlePageChange}
        tableStyle={{ minWidth: '800px', width: '100%' }}
        size="small"
        selection={currentPageSelected}
        onSelectionChange={handleSelectionChange}
        selectionMode="checkbox"
        dataKey="id"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
        <Column field="title" header="Title" style={{ width: '250px' }}></Column>
        <Column field="place_of_origin" header="Place" style={{ width: '120px' }}></Column>
        <Column field="artist_display" header="Artist" style={{ width: '200px' }}></Column>
        <Column field="inscriptions" header="Inscriptions" style={{ width: '150px' }}></Column>
        <Column field="date_start" header="Start" style={{ width: '80px' }}></Column>
        <Column field="date_end" header="End" style={{ width: '80px' }}></Column>
      </DataTable>
    </div>
  );
};

export default TableComponent;
