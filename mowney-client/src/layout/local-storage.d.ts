declare module 'local-storage' {
  function ls(key: string): string;

  namespace LocalStorage {
    function get(key: string): string;
    function set(key: string, value: string): boolean;
    function remove(key: string): boolean;
  }

  export default LocalStorage;
}
