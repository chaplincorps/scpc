import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogClose,
  DialogTitle
} from "@/components/ui/dialog";
import { XIcon, Search, ArrowLeft,ListX  } from "lucide-react";

export default function ArticleDocsModal({ open, onClose, articles, initialArticle }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (open) {
      if (initialArticle) {
        const found = articles.find(article => article.id === initialArticle);
        setSelected(found || null);
      } else {
        setSelected(null);
      }
    } else {
      setSelected(null);
      setSearch("");
      setSearchOpen(false);
    }
  }, [open, initialArticle, articles]);

  const filtered = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.description.toLowerCase().includes(search.toLowerCase()) ||
      article.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/70" />
      <DialogContent
        showCloseButton={false}
        className="p-0 !w-[70%] h-[90vh] !max-w-none max-h-none rounded-2xl overflow-hidden flex flex-col shadow-2xl border-0 bg-white !left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2"
        style={{ background: "#fff" }}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#006699] text-white sticky top-0 z-10" style={{ minHeight: 64 }}>
          <div className="flex items-center gap-2">
            {selected && (
              <button
                className="mr-2 p-1 rounded hover:bg-[#004d73]/30"
                onClick={() => setSelected(null)}
                aria-label="Back to list"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <DialogTitle>Docs</DialogTitle>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded hover:bg-[#004d73]/30"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <DialogClose asChild>
              <button
                className="p-2 rounded hover:bg-[#004d73]/30"
                onClick={onClose}
                aria-label="Close"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </DialogClose>
          </div>
        </div>
        {/* Search Field */}
        {searchOpen && !selected && (
          <div className="px-6 py-3 border-b border-gray-100 bg-[#f0f6fa]">
            <input
              autoFocus
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-2 rounded-lg border border-[#006699]/30 focus:border-[#006699] outline-none text-gray-800 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ fontSize: 16 }}
            />
          </div>
        )}
        {/* Main Content */}
        <div className="relative flex-1 overflow-y-auto bg-white">
          {/* Article List */}
          {!selected && (
            <div className={`p-6 ${filtered.length === 0 ? 'flex items-center justify-center' : ''}`}>
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center">
                  <ListX className="w-10 h-10 text-[#006699]"  />
                  <div className="mb-2 text-lg font-semibold text-gray-700">No articles found</div>
                  <div className="max-w-xs text-sm text-center text-gray-500">There are currently no help articles available. Please check back later or contact support for assistance.</div>
                </div>
              ) : (
                <div className="grid w-full h-auto grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((article, idx) => (
                    <div
                      key={article.id}
                      className="bg-[#f0f6fa] border border-[#006699]/10 rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col"
                      onClick={() => setSelected(article)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Read article: ${article.title}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-[#006699] bg-[#006699]/10 px-2 py-1 rounded">
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-500">{article.readTime}</span>
                      </div>
                      <div className="mb-1 text-lg font-bold text-gray-800">{article.title}</div>
                      <div className="flex-1 text-sm text-gray-600">{article.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* Article Detail View */}
          {selected && (
            <div className="absolute inset-0 flex flex-col bg-white animate-slide-in-left">
              <div className="flex-1 p-8 overflow-y-auto">
                <div className="mb-2">
                  <span className="text-xs font-semibold text-[#006699] bg-[#006699]/10 px-2 py-1 rounded">
                    {selected.category}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">{selected.readTime}</span>
                </div>
                <h2 className="mb-4 text-2xl font-bold text-gray-800">{selected.title}</h2>
                <div className="text-base leading-relaxed text-gray-700">
                  {/* Placeholder for full article content. Replace with real content if available. */}
                  {selected.description}
                  <div className="mt-8 text-sm italic text-gray-400">(Full article content goes here.)</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 